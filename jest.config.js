module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/?(*.)+(spec|test).ts"
  ],
  moduleNameMapper: {
    "^@modules/(.*)$": "<rootDir>/src/modules/$1"
  }
};
