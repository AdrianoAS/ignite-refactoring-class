module.exports = {
    moduleNameMapper: {
        // Handle CSS imports (with CSS modules)
        // https://jestjs.io/docs/webpack#mocking-css-modules
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

        // Handle module aliases
        '^@/components/(.*)$': '<rootDir>/src/$1',
        '^@/pages/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTest.ts'],
    moduleDirectories: ["node_modules", 'src'],
    testPathIgnorePatterns: ['node_modules/'],
    testEnvironment: 'jsdom',
    transform: {
        // Use babel-jest to transpile tests with the next/babel preset
        // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
        '^.+\\.(js|jsx|ts|tsx)$': "<rootDir>/node_modules/babel-jest",
    },

    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.tsx",
    ],
    coverageReporters: ["lcov", "json"]
}
