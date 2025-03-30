module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  testMatch: [
    '<rootDir>/__tests__/**/*.test.{ts,tsx}'
  ],
  
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  
  modulePaths: ['<rootDir>/src'],
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/setupTests.ts'
  ]
};