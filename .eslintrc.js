module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true
  },
  plugins: ["react", "import"],
  settings: {
    "import/resolver": {
      /** To avoid unresolved alliased imports */
      node: {
        paths: ["src"]
      }
    }
  },
  extends: "airbnb",
  rules: {
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to"]
      }
    ],
    "function-paren-newline": [0],
    "react/require-default-props": 0,
    "react/no-did-mount-set-state": [0],
    "react/no-array-index-key": 0,
    "react/jsx-no-bind": ["warn"],
    "jsx-a11y/html-has-lang": [0],
    "consistent-return": [0],
    "arrow-body-style": [0],
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTaggedTemplates: true
      }
    ],
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": 0,
    "linebreak-style": 0,
    semi: [2, "always"],
    "no-unexpected-multiline": 2, // for cases like syntactic sugar destructuring into variables
    quotes: ["error", "double"],
    "react/prop-types": [
      1,
      {
        skipUndeclared: true,
        ignore: [
          "children",
          // when nesting styled-components explicitly passing down className
          "className",
          // when wrapping @withTheme
          "theme",
          // when wrapping with queries and not changing the default 'data' name
          "data"
        ]
      }
    ],
    "react/no-unescaped-entities": [
      "error",
      {
        forbid: [">", "}", '"']
      }
    ],
    "react/forbid-prop-types": [
      1,
      {
        forbid: ["any"]
      }
    ],
    "react/jsx-filename-extension": [
      2,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true
      }
    ],
    "max-len": [
      "error",
      {
        code: 110
      }
    ]
  },
  globals: {
    it: true,
    mixpanel: true,
    test: true,
    expect: true,
    describe: true
  }
};
