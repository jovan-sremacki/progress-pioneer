module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: [
    "**/?(*.)+(spec|test).ts"
  ],
  moduleNameMapper: {
    "^@modules/(.*)$": "<rootDir>/src/modules/$1"
  },
  setupFiles: ['<rootDir>/jest.setup.js']
};
