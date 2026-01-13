module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'server/**/*.js',
    '!server/tests/**',
    '!server/node_modules/**'
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  testTimeout: 10000
};
