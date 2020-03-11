module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/src/tsconfig.spec.json',
            ignoreCoverageForAllDecorators: true,
        },
    },
    roots: ['<rootDir>/src', '<rootDir>/src/testing/mocks'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@lib/(.*)$': '<rootDir>/src/lib/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@testing/(.*)$': '<rootDir>/src/testing/$1',
        '^@mocks/(.*)$': '<rootDir>/src/testing/mocks/__mocks__/$1',
    },
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/lib/orm/entity/**/*.ts',
        '!<rootDir>/src/testing/**/*.ts',
        '!<rootDir>/src/migrations/**/*.ts'
    ],
    coverageThreshold: {
        "global": {
            "branches": 100,
            "functions": 100,
            "lines": 100,
            "statements": 100
        }
    },
};
