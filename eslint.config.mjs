import coreWebVitals from "eslint-config-next/core-web-vitals";

// `set-state-in-effect` is downgraded to a warning: the codebase intentionally
// hydrates state from localStorage on mount (useFavorites) and initializes an
// auto-hide UI timer (Viewer). Both must run in an effect to stay SSR-safe —
// reading localStorage during render would break hydration — so the rule fires
// false positives here. Kept as a warning so genuine misuse is still surfaced.
const config = [
  { ignores: [".next/**", "node_modules/**", "out/**"] },
  ...coreWebVitals,
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
