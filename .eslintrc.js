module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
    ],
    rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'max-classes-per-file': ['error', 2],
        'no-await-in-loop': ['error'],
        'no-loss-of-precision': ['error'],
        'no-promise-executor-return': ['error'],
        'array-callback-return': ['error'],
        complexity: [1, 15],
        'guard-for-in': 1,
        'no-constructor-return': 1,
        '@typescript-eslint/indent': ['warn', 4],
        'operator-linebreak': 'off',
        'implicit-arrow-linebreak': 'off',
        'function-paren-newline': 'off',
        'arrow-parens': 'off',
    },
    parserOptions: {
        project: './tsconfig.json',
    },
    ignorePatterns: ['*.js', 'out/**/*', 'test/**/*'],
};
