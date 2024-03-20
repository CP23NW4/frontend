// module.exports = {
//   testEnvironment: 'node',
//   moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
//   preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
//   transform: {
//     '^.+\\.vue$': 'vue-jest',
//     '^.+\\.js$': 'babel-jest',
//   },
//   babelConfig: {
//     presets: ['@babel/preset-env'],
//   },
// };

module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: [
    "**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  transformIgnorePatterns: [
    "/node_modules/"
  ],
  snapshotSerializers: [
    "jest-serializer-vue"
  ]
};

