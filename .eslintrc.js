module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'max-classes-per-file': ['error', 1],
    },
    ignorePatterns: ['*.js', 'Guides/Hi/**/*', 'Client/build/**/*'],
};
