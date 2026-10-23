/**
 * Behaviour of the Book a Demo dialog, v2 (markup: components/sections/DemoModal.astro, fields: demo/DemoField.astro,
 * spec: docs/FORM-SPEC.md, log: docs/FIX-LOG-form.md).
 *
 * Contract with the page: any `[data-demo-open]` element, `a[href="#demo"]` link or a `#demo` URL hash opens it;
 * it announces `yawmy:demo-open`, `yawmy:demo-submit` (step 1), `yawmy:demo-enrich` (step 2 sent) and `yawmy:demo-skip`
 * on `document` (analytics hooks, no vendor coupling, no personal data in the details).
 *
 * Two steps, one lead: step 1 (name, mobile / WhatsApp, nursery) is POSTed at once; the optional step 2 (email, number of
 * children, what they use today, preferred date and time, country) is a second POST with the same client-generated `leadId`.
 * Anti-bot (step 1): a honeypot field, a minimum time since the dialog opened, and a requirement for a trusted user event.
 * The endpoint comes from PUBLIC_DEMO_FORM_ENDPOINT (https only; http allowed in dev); unset in production shows the
 * "not connected" error, unset in dev simulates success. User input is only ever written back with textContent.
 */
import type { Dictionary } from "@/i18n";
import { getRegion } from "@/config/region-client";

type FieldMsgs = {
  required: string;
  invalid?: string;
  min?: string;
  past?: string;
};
type Demo = Dictionary["sections"]["demo"];
type FieldName = "name" | "phone" | "nursery" | "email" | "date" | "time";
/** The copy the dialog carries in `data-messages` (validation, status and error strings). */
type Messages = Pick<Demo, "summary" | "submit" | "submitting"> & {
  step2Submit: string;
  fields: Record<FieldName, FieldMsgs>;
  error: Pick<Demo["error"], "body" | "notConnected" | "tooFast">;
};
type State = "idle" | "submitting" | "enrich" | "enriching" | "done" | "error";
type Delivery = "ok" | "simulated" | "not-configured" | "timeout" | "network";

// A step 1 submit with no trusted user event at all (key, pointer, touch, input, click: covers assistive tech and
// dictation), or sooner than this after the dialog was OPENED (not after page load), is treated as a bot.
// Browser / password-manager autofill (:autofill) skips the timing, so it never trips the check.
const MIN_FILL_MS = 2000;
const TIMEOUT_MS = 10000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Liberal on purpose (docs/FORM-SPEC.md): digits, one leading +, spaces, dashes, dots and brackets; 8-15 digits.
const PHONE_CHARS_RE = /^\+?[\d\s\-.()]+$/;

function newLeadId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  // randomUUID needs a secure context; plain-http test hosts fall back to 128 random bits.
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function initDemo(dialog: HTMLDialogElement): void {
  const messages = JSON.parse(dialog.dataset.messages ?? "{}") as Messages;
  const form = dialog.querySelector<HTMLFormElement>("[data-demo-form]")!;
  const enrichForm = dialog.querySelector<HTMLFormElement>("[data-enrich-form]")!;
  const panels = {
    form: dialog.querySelector<HTMLElement>('[data-panel="form"]')!,
    enrich: dialog.querySelector<HTMLElement>('[data-panel="enrich"]')!,
    done: dialog.querySelector<HTMLElement>('[data-panel="done"]')!,
    error: dialog.querySelector<HTMLElement>('[data-panel="error"]')!,
  };
  const status = dialog.querySelector<HTMLElement>("[data-demo-status]")!;
  const errorBody = dialog.querySelector<HTMLElement>("[data-demo-error-body]")!;
  const contactBox = dialog.querySelector<HTMLElement>("[data-demo-contact]");
  const submitButton = dialog.querySelector<HTMLButtonElement>("[data-demo-submit]")!;
  const submitLabel = submitButton.querySelector("span")!;
  const enrichSubmit = dialog.querySelector<HTMLButtonElement>("[data-enrich-submit]")!;
  const enrichLabel = enrichSubmit.querySelector("span")!;
  const skipButton = dialog.querySelector<HTMLButtonElement>("[data-demo-skip]")!;
  const honeypot = form.elements.namedItem("company_website") as HTMLInputElement;
  const field = (f: HTMLFormElement, n: string) => f.elements.namedItem(n) as HTMLInputElement;
  const nameInput = field(form, "name");
  const phoneInput = field(form, "phone");
  const nurseryInput = field(form, "nursery");
  const emailInput = field(enrichForm, "email");
  const dateInput = field(enrichForm, "date");
  const timeInput = field(enrichForm, "time");
  const regionSelect = enrichForm.elements.namedItem("region") as HTMLSelectElement;
  const step1Inputs = [nameInput, phoneInput, nurseryInput];
  const step2Inputs = [emailInput, dateInput, timeInput];
  const allInputs = [...step1Inputs, ...step2Inputs];

  let state: State = "idle";
  let errorReturn: "idle" | "enrich" = "idle";
  let opener: HTMLElement | null = null;
  let leadId: string | null = null; // created on the first step 1 submit, reused on retry, dropped when the flow ends
  let suppressed = false; // honeypot tripped: pretend, send nothing (also for step 2)
  let firstInteractionAt = -1; // performance.now() of the first trusted user event since open (-1 = none yet)
  let openedAt = 0; // performance.now() when the dialog opened
  let openedFromHash = false;

  const locale = () => document.documentElement.lang;
  // `data-demo-open` is a bare attribute on most openers (Astro renders it as "true"): only a real value names the source.
  const sourceOf = (el: HTMLElement | null, viaHash: boolean) => {
    const v = el?.dataset.demoOpen;
    return v && v !== "true" ? v : viaHash ? "hash" : "link";
  };
  const emit = (name: string, detail: Record<string, unknown>) =>
    document.dispatchEvent(new CustomEvent(name, { detail }));

  for (const type of ["keydown", "pointerdown", "touchstart", "input", "change", "click"]) {
    dialog.addEventListener(
      type,
      (event) => {
        if (event.isTrusted && firstInteractionAt < 0) firstInteractionAt = performance.now();
      },
      true,
    );
  }
  const isAutofilled = () =>
    step1Inputs.some((input) => {
      try {
        return input.matches(":autofill");
      } catch {
        try {
          return input.matches(":-webkit-autofill");
        } catch {
          return false;
        }
      }
    });

  /* ---------- dates ---------- */
  const pad = (n: number) => String(n).padStart(2, "0");
  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  const nowTime = () => {
    const d = new Date();
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  /* ---------- validation ---------- */
  const errorEl = (input: HTMLInputElement) => document.getElementById(`${input.id}-error`)!;
  const phoneDigits = (value: string) => value.replace(/\D/g, "");

  function messageFor(input: HTMLInputElement): string {
    const key = input.name as FieldName;
    const msgs = messages.fields[key];
    const value = input.value.trim();
    const v = input.validity;
    if (value === "" && !v.badInput) return input.required ? msgs.required : "";
    if (key === "phone") {
      const digits = phoneDigits(value).length;
      return PHONE_CHARS_RE.test(value) && digits >= 8 && digits <= 15 ? "" : (msgs.invalid ?? msgs.required);
    }
    if (key === "email" && (v.typeMismatch || !EMAIL_RE.test(value))) return msgs.invalid ?? msgs.required;
    if ((key === "date" || key === "time") && v.badInput) return msgs.invalid ?? msgs.required;
    if (key === "date" && (v.rangeUnderflow || value < today())) return msgs.min ?? msgs.required;
    if (key === "time" && dateInput.value === today() && value < nowTime()) return msgs.past ?? msgs.required;
    return "";
  }

  function validate(input: HTMLInputElement): boolean {
    const message = messageFor(input);
    errorEl(input).textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    return message === "";
  }

  function clearErrors() {
    for (const input of allInputs) {
      errorEl(input).textContent = "";
      input.removeAttribute("aria-invalid");
    }
    status.textContent = "";
  }

  for (const input of allInputs) {
    input.addEventListener("blur", () => {
      if (input.value !== "" || input.hasAttribute("aria-invalid")) validate(input);
    });
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validate(input);
      if (input === dateInput && timeInput.hasAttribute("aria-invalid")) validate(timeInput);
      // The "please fix" summary goes away once nothing is flagged any more.
      if (status.textContent === messages.summary && !allInputs.some((i) => i.getAttribute("aria-invalid") === "true"))
        status.textContent = "";
    });
  }
  // The email is Latin even on an Arabic page: set it LTR as soon as there is a value. (The phone input is always LTR.)
  emailInput.addEventListener("input", () => {
    if (emailInput.value) emailInput.setAttribute("dir", "ltr");
    else emailInput.removeAttribute("dir");
  });
  dateInput.addEventListener("change", () => {
    if (timeInput.value) validate(timeInput);
  });

  /* ---------- state ---------- */
  const headings: Record<State, [heading: string, description: string]> = {
    idle: ["demo-title", "demo-lead"],
    submitting: ["demo-title", "demo-lead"],
    enrich: ["demo-enrich-title", "demo-enrich-lead"],
    enriching: ["demo-enrich-title", "demo-enrich-lead"],
    done: ["demo-done-title", "demo-done-body"],
    // The error panel's body is a role="alert" and is announced by itself, so it is not repeated as a description.
    error: ["demo-error-title", ""],
  };

  function setState(next: State) {
    const prev = state;
    state = next;
    const panel = next === "submitting" ? "idle" : next === "enriching" ? "enrich" : next;
    panels.form.hidden = panel !== "idle";
    panels.enrich.hidden = panel !== "enrich";
    panels.done.hidden = panel !== "done";
    panels.error.hidden = panel !== "error";
    const busy1 = next === "submitting";
    const busy2 = next === "enriching";
    submitButton.disabled = busy1;
    submitButton.setAttribute("aria-busy", String(busy1));
    submitLabel.textContent = busy1 ? messages.submitting : messages.submit;
    enrichSubmit.disabled = busy2;
    enrichSubmit.setAttribute("aria-busy", String(busy2));
    enrichLabel.textContent = busy2 ? messages.submitting : messages.step2Submit;
    skipButton.disabled = busy2;
    status.textContent = busy1 || busy2 ? messages.submitting : "";
    const [heading, description] = headings[next];
    dialog.setAttribute("aria-labelledby", heading);
    if (description) dialog.setAttribute("aria-describedby", description);
    else dialog.removeAttribute("aria-describedby");
    // Moving to a new panel: focus its heading (it is tabindex=-1) so screen readers announce it and keyboard users
    // continue from there. Staying on the same panel (idle <-> submitting) keeps focus where it is.
    if (prev !== next && (next === "enrich" || next === "done" || next === "error")) {
      document.getElementById(heading)!.focus();
    }
  }

  function showError(message: string, returnTo: "idle" | "enrich", withContact = false) {
    errorBody.textContent = message;
    if (contactBox) contactBox.hidden = !withContact;
    errorReturn = returnTo;
    setState("error");
  }

  /** Back to a clean step 1 (keeps nothing: a new visit is a new lead). */
  function resetFlow() {
    form.reset();
    enrichForm.reset();
    emailInput.removeAttribute("dir");
    clearErrors();
    leadId = null;
    suppressed = false;
    setState("idle");
  }

  function enterEnrich() {
    form.reset();
    enrichForm.reset();
    emailInput.removeAttribute("dir");
    clearErrors();
    dateInput.min = today();
    regionSelect.value = getRegion(); // pre-filled from the page region
    setState("enrich");
  }

  function finish() {
    form.reset();
    enrichForm.reset();
    emailInput.removeAttribute("dir");
    clearErrors();
    leadId = null;
    suppressed = false;
    setState("done");
  }

  dialog.querySelector("[data-demo-retry]")!.addEventListener("click", () => {
    setState(errorReturn === "enrich" ? "enrich" : "idle");
    (errorReturn === "enrich" ? emailInput : nameInput).focus();
  });

  /* ---------- delivery ---------- */
  function endpoint(): URL | null {
    const raw = import.meta.env.PUBLIC_DEMO_FORM_ENDPOINT;
    if (typeof raw !== "string" || raw.trim() === "") return null;
    try {
      const url = new URL(raw.trim());
      // https only; plain http is allowed for a local test endpoint in dev builds.
      return url.protocol === "https:" || (import.meta.env.DEV && url.protocol === "http:") ? url : null;
    } catch {
      return null;
    }
  }

  /** The fields every POST carries. `pageUrl` has no query string or hash (they can hold campaign tokens). */
  const base = (step: 1 | 2) => ({
    step,
    leadId: leadId!,
    locale: locale(),
    pageUrl: location.origin + location.pathname,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    submittedAt: new Date().toISOString(),
  });

  async function deliver(payload: Record<string, unknown>): Promise<Delivery> {
    if (suppressed) return "simulated";
    const url = endpoint();
    if (!url) {
      if (!import.meta.env.DEV) return "not-configured";
      console.warn(
        "[demo form] PUBLIC_DEMO_FORM_ENDPOINT is not set (or is not https). Dev build: simulating success, nothing was sent.",
        payload,
      );
      await new Promise((resolve) => setTimeout(resolve, 600));
      return "simulated";
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        credentials: "omit",
        cache: "no-store",
        referrerPolicy: "no-referrer",
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return "ok";
    } catch {
      return controller.signal.aborted ? "timeout" : "network";
    } finally {
      clearTimeout(timer);
    }
  }

  /* ---------- step 1 ---------- */
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (state !== "idle") return; // double-submit lock

    const invalid = step1Inputs.filter((input) => !validate(input));
    if (invalid.length > 0) {
      status.textContent = messages.summary;
      invalid[0]!.focus();
      return;
    }
    status.textContent = "";

    // Honeypot filled: a bot. Pretend it worked, send nothing.
    if (honeypot.value !== "") {
      emit("yawmy:demo-submit", { status: "blocked", reason: "honeypot", step: 1 });
      suppressed = true;
      enterEnrich();
      return;
    }
    if (firstInteractionAt < 0 || (!isAutofilled() && performance.now() - openedAt < MIN_FILL_MS)) {
      emit("yawmy:demo-submit", { status: "blocked", reason: "too-fast", step: 1 });
      showError(messages.error.tooFast, "idle");
      return;
    }

    leadId ??= newLeadId();
    const region = getRegion();
    const phone = phoneInput.value.trim();
    const digits = phoneDigits(phone);
    const payload = {
      ...base(1),
      name: nameInput.value.trim(),
      phone,
      // Only when the visitor typed a country code (+ or 00): otherwise the country is unknown and we do not guess.
      ...(phone.startsWith("+") || phone.startsWith("00")
        ? { phoneE164: `+${phone.startsWith("00") ? digits.slice(2) : digits}` }
        : {}),
      nursery: nurseryInput.value.trim(),
      region,
      source: sourceOf(opener, openedFromHash),
    };

    setState("submitting");
    const result = await deliver(payload);
    if (result === "ok" || result === "simulated") {
      emit("yawmy:demo-submit", {
        status: "success",
        step: 1,
        ...(result === "simulated" ? { simulated: true } : {}),
        locale: locale(),
        region,
      });
      enterEnrich();
    } else if (result === "not-configured") {
      emit("yawmy:demo-submit", { status: "error", reason: "not-configured", step: 1, locale: locale() });
      showError(messages.error.notConnected, "idle", true);
    } else {
      emit("yawmy:demo-submit", { status: "error", reason: result, step: 1, locale: locale() });
      showError(messages.error.body, "idle");
    }
  });

  /* ---------- step 2 (optional) ---------- */
  enrichForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (state !== "enrich") return; // double-submit lock

    const invalid = step2Inputs.filter((input) => !validate(input));
    if (invalid.length > 0) {
      status.textContent = messages.summary;
      invalid[0]!.focus();
      return;
    }
    status.textContent = "";

    const picked = (name: string) => enrichForm.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value;
    const payload = {
      ...base(2),
      email: emailInput.value.trim() || undefined,
      children: picked("children"),
      currentTool: picked("tool"),
      date: dateInput.value || undefined,
      time: timeInput.value || undefined,
      region: regionSelect.value,
    };

    setState("enriching");
    const result = await deliver(payload);
    if (result === "ok" || result === "simulated") {
      emit("yawmy:demo-enrich", { status: "success", locale: locale(), region: regionSelect.value });
      finish();
    } else {
      emit("yawmy:demo-enrich", { status: "error", reason: result, locale: locale() });
      showError(messages.error.body, "enrich");
    }
  });

  skipButton.addEventListener("click", () => {
    if (state !== "enrich") return;
    emit("yawmy:demo-skip", { locale: locale(), region: regionSelect.value });
    finish();
  });

  /* ---------- open / close ---------- */
  function open(from: HTMLElement | null, viaHash = false) {
    if (dialog.open) return;
    opener = from;
    openedFromHash = viaHash;
    firstInteractionAt = -1;
    openedAt = performance.now();
    if (state === "enrich" || state === "done" || state === "error") resetFlow();
    dialog.showModal();
    emit("yawmy:demo-open", {
      source: sourceOf(from, viaHash),
    });
  }

  dialog.addEventListener("close", () => {
    if (location.hash === "#demo") history.replaceState(null, "", location.pathname + location.search);
    if (state === "enrich" || state === "done" || state === "error") resetFlow();
    // Browsers restore focus to the opener themselves. When the opener is no longer rendered (the mobile
    // menu panel closes when its link is clicked, so its Book a Demo button is display:none), focus the
    // menu toggle instead of dropping to <body>.
    const rendered = (el: HTMLElement | null): el is HTMLElement =>
      !!el && el.isConnected && el.getClientRects().length > 0;
    const toggle = document.querySelector<HTMLElement>("[data-nav-toggle]");
    const target = rendered(opener) ? opener : opener && rendered(toggle) ? toggle : null;
    if (target && document.activeElement !== target) target.focus();
  });

  // Delegated, so openers added later (or in other sections) work with no wiring.
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const trigger = target?.closest<HTMLElement>('[data-demo-open], a[href="#demo"]');
    if (!trigger) return;
    event.preventDefault();
    open(trigger);
  });

  dialog.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("[data-demo-close]")) dialog.close();
  });

  // Backdrop click closes, but only when the press also started on the backdrop
  // (so dragging a text selection out of the panel does not dismiss it).
  let pressedBackdrop = false;
  dialog.addEventListener("pointerdown", (event) => {
    pressedBackdrop = event.target === dialog;
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog && pressedBackdrop) dialog.close();
    pressedBackdrop = false;
  });

  const openFromHash = () => {
    if (location.hash === "#demo") open(null, true);
  };
  window.addEventListener("hashchange", openFromHash);
  openFromHash();
}

/** Wires the single `<dialog id="demo">` on the page (DemoModal.astro); a no-op when it is not mounted. */
export function initDemoModal(): void {
  const dialog = document.getElementById("demo");
  if (dialog instanceof HTMLDialogElement) initDemo(dialog);
}
