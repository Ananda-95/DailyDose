module.exports = {
    testEnvironment: "jsdom",

    transform: {
        "^.+\\.[jt]sx?$": "babel-jest"
    },

    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],

    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
    ]
};