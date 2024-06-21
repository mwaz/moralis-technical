const playwright = require("eslint-plugin-playwright");

module.exports = [
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**"],

    rules: {
      semi: "error",
      "prefer-const": "error",
    },
  },
];
