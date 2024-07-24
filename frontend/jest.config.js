module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|react-native-button|expo|@expo|@unimodules|unimodules|@unimodules|expo-asset)/)',
    ],
    globals: {
        __DEV__: true,
    },
}
