const config = {
  $schema: "https://json.schemastore.org/prettierrc.json",
  printWidth: 100,
  tabWidth: 4,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "auto",
  embeddedLanguageFormatting: "auto",
  quoteProps: "as-needed",
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  vueIndentScriptAndStyle: false,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
