import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  ...compat.extends("eslint:recommended"),
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    rules: {
      // Customize rules as needed
    },
  },
];
