import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.{js,ts,jsx,tsx,cjs,cts,mjs,mts,html,vue,coffee,ejs}"]
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    pluginJs.configs.recommended,
    stylistic.configs["recommended-flat"],
    stylistic.configs["disable-legacy"],
    stylistic.configs.customize({
        indent: 4,
        quotes: "double",
        semi: true,
        commaDangle: "never",
        jsx: true
    }),
    {
        rules: {
            "no-unused-vars": ["error", { argsIgnorePattern: "next" }]
        }
    }
];
