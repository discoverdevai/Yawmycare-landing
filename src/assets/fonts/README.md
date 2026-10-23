# Licensed brand fonts

Drop WOFF2 files here and they are picked up automatically by `src/styles/fonts.ts` (no code change):

| Family               | Files                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Recoleta (English)   | `recoleta-400.woff2`, `recoleta-500.woff2`, `recoleta-600.woff2`, `recoleta-700.woff2`, `recoleta-900.woff2` |
| Expo Arabic (Arabic) | `expo-arabic-400.woff2`, `expo-arabic-500.woff2`, `expo-arabic-700.woff2`                                    |

Until then the open-licence stand-ins (Fraunces, Readex Pro) render.

Subsetting (keep shaping features — do not strip `kern`, `liga`, `calt`, `mark`, `mkmk`, `locl`):

    pyftsubset Recoleta-Bold.ttf --flavor=woff2 --layout-features='*' \
      --unicodes="U+0020-007E,U+00A0-00FF,U+2010-2027,U+20AC" --output-file=recoleta-700.woff2

    pyftsubset ExpoArabic-Bold.ttf --flavor=woff2 --layout-features='*' \
      --unicodes="U+0600-06FF,U+0750-077F,U+FB50-FDFF,U+FE70-FEFF,U+0020-007E,U+0660-0669" --output-file=expo-arabic-700.woff2
