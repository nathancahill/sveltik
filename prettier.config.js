module.exports = {
    printWidth: 80,
    trailingComma: 'all',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    arrowParens: 'avoid',
    svelteSortOrder: 'styles-scripts-markup',
    svelteBracketNewLine: true,
    overrides: [
        {
            files: '*.svelte',
            options: {
                parser: 'svelte',
                printWidth: 120,
            },
        },
    ],
}
