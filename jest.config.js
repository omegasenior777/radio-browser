// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // diretório raiz do seu projeto
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Para compilar JS/TS
  },
};

module.exports = createJestConfig(customJestConfig);

