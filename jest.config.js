module.exports = {
  'testEnvironment': 'node',
  'transform': {
    '.(ts|tsx)': '<rootDir>/preprocessor.js'
  },
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  'root': [
    '<rootDir>/src'
  ],
  'testMatch': [
    '**/__tests__/**/*.+(ts|js)',
    '**/?(*.)+(spec|test).+(ts|js)'
  ],
  'collectCoverageFrom': [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
  ],
  'moduleNameMapper': {
    '^@application/(.*)': '<rootDir>/src/application/$1',
    '^@constants/(.*)': '<rootDir>/src/constants/$1',
    '^@core/(.*)': '<rootDir>/src/core/$1',
    '^@domain/(.*)': '<rootDir>/src/domain/$1',
    '^@config/(.*)': '<rootDir>/src/config/$1',
    '^@interfaces/(.*)': '<rootDir>/src/interfaces/$1',
    '^@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
  }
};