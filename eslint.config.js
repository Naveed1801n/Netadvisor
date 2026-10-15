import js from "@eslint/js";import globals from "globals";import react from "eslint-plugin-react";import hooks from "eslint-plugin-react-hooks";import a11y from "eslint-plugin-jsx-a11y";
export default [{ignores:["dist","node_modules","public"]},js.configs.recommended,{files:["**/*.{js,jsx,mjs}"],languageOptions:{ecmaVersion:"latest",sourceType:"module",globals:{...globals.browser,...globals.node},parserOptions:{ecmaFeatures:{jsx:true}}},settings:{react:{version:"18"}},
 plugins:{react,"react-hooks":hooks,"jsx-a11y":a11y},
 rules:{...react.configs.recommended.rules,...react.configs["jsx-runtime"].rules,...hooks.configs.recommended.rules,...a11y.flatConfigs.recommended.rules,"react/prop-types":"off","no-unused-vars":["warn",{varsIgnorePattern:"^[A-Z_]"}]}}];
