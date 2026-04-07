// @ts-check
import tseslint from "typescript-eslint";
import lirPlugin from "./packages/eslint-plugin-letitrip/index.js";

export default tseslint.config(
  ...tseslint.configs.recommended,
  ...lirPlugin.configs.recommended,
  // ── Disable letitrip.in-specific rules that don't apply in the packages workspace ──
  {
    files: ["packages/*/src/**/*.{ts,tsx}"],
    rules: {
      // Some packages carry compatibility disables for plugins not loaded in this workspace config.
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "off",
      "jsx-a11y/media-has-caption": "off",
      "react/no-danger": "off",
      // @/ barrel aliases don't exist in packages — each package imports @mohasinac/* directly
      "lir/no-deep-barrel-import": "off",
      // @/features/ path pattern not applicable — replaced by PKG-002 (no-cross-feat-import)
      "lir/no-cross-feature-import": "off",
      // @/features/ path pattern not applicable for packages
      "lir/no-tier1-feature-import": "off",
      // No Next.js [locale]/…/page.tsx in packages
      "lir/no-fat-page": "off",
      // No @/i18n/navigation in packages (each consumer app provides its own)
      "lir/use-i18n-navigation": "off",
      // router.push() is not used in packages
      "lir/no-hardcoded-route": "off",
      // No API_ENDPOINTS constant in packages; hooks use typed path builders
      "lir/no-hardcoded-api-path": "off",
    },
  },
  {
    files: ["packages/*/src/**/*.tsx"],
    rules: {
      "lir/no-raw-html-elements": "error",
      "lir/no-raw-media-elements": "error",
    },
  },
  {
    files: [
      "packages/ui/src/**/*.{ts,tsx}",
      "packages/feat-forms/src/**/*.{ts,tsx}",
      "packages/feat-media/src/**/*.{ts,tsx}",
    ],
    rules: {
      "lir/no-raw-html-elements": "off",
      "lir/no-raw-media-elements": "off",
    },
  },
  {
    ignores: ["node_modules/**", "**/dist/**", "scripts/**"],
  },
);
