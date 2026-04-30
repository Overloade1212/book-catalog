import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      // Разрешаем неиспользуемые переменные в catch
      "no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrors": "none"
      }],
      // Можно отключить правило про бесполезный catch
      "no-useless-catch": "warn"
    }
  }
];