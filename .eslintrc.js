module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:react/recommended",
    "standard-with-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"]
  },
  plugins: [
    "react"
  ],
  "ignorePatterns": [
    ".eslintrc.js"
  ],
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    // typeを使って型定義することを許可
    "@typescript-eslint/consistent-type-definitions": "off",
    // 関数の戻り値の型を明示しなくてもよい
    "@typescript-eslint/explicit-function-return-type": "off",
    // nullチェックの省略記法を許可
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    // 空の関数の代入を許可
    "@typescript-eslint/no-empty-function": "off",
    // 静的クラスの作成を許可
    "@typescript-eslint/no-extraneous-class": "off",
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
    "react/react-in-jsx-scope": "off",
    // cssプロパティを許可するため
    "react/no-unknown-property": "off",
    "no-void": [
      "error",
      {
        allowAsStatement: true,
      },
    ],
    "no-unneeded-ternary": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
    },
  }
}
