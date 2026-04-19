import js from "@eslint/js";
import globals from "globals";

export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.node  // ← change browser to node
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": "warn",
            "no-console": "off",
        }
    }
];