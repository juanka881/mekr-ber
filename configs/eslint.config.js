/**
 * general configuration for eslint
 * https://github.com/typescript-eslint/typescript-eslint
 * https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
 */

/**
 * eslint config
 */
const config = {
	// use typescript parser
	parser: '@typescript-eslint/parser',
	plugins: [
		// enable typescript lintig
		'@typescript-eslint',
	],
	extends: [
		// use recommended typescript rules
		'plugin:@typescript-eslint/recommended',
	],
	ignorePatterns: [
		'*.js',
		'dist/*',
	],
	rules: {
		// prevent direct buffer constructor
		// https://eslint.org/docs/rules/no-buffer-constructor
		'no-buffer-constructor': ['error'],

		// enforce curly {} for if,else,do,while,for
		// https://eslint.org/docs/rules/curly
		'curly': ['error', 'all'],

		// no yoda expressions
		// https://eslint.org/docs/rules/yoda
		'yoda': ['error', 'never', { 'exceptRange': true }],

		// fix multiple spaces in code
		// https://eslint.org/docs/rules/no-multi-spaces
		'no-multi-spaces': ['error'],

		// always place statements of single blocks of if,else,throw,catch
		// in the line below
		// https://eslint.org/docs/rules/nonblock-statement-body-position
		'nonblock-statement-body-position': ['error', 'below'],

		// ensure files end with new line break
		// https://eslint.org/docs/rules/eol-last
		'eol-last': ['error', 'always'],

		// use stroustrup brace style
		// https://eslint.org/docs/rules/brace-style
		// https://en.wikipedia.org/wiki/Indentation_style
		'brace-style': ['error', 'stroustrup', { 'allowSingleLine': false }],

		// remove trailing spaces
		// https://eslint.org/docs/rules/no-trailing-spaces
		'no-trailing-spaces': ['error'],

		// consistent comma spacing
		// https://eslint.org/docs/rules/comma-spacing
		'comma-spacing': ['error', { 'before': false, 'after': true }],

		// always add trailing comma on multiline declarations
		// https://eslint.org/docs/rules/comma-dangle
		'comma-dangle': ['error', 'always-multiline'],

		// consistent object curly spacing
		// https://eslint.org/docs/rules/object-curly-spacing
		'object-curly-spacing': ['error', 'always'],

		// always use single quotes
		// https://eslint.org/docs/rules/quotes
		'quotes': ['error', 'single'],

		// always use semicolons on statements
		// https://eslint.org/docs/rules/semi
		'semi': ['error', 'always'],

		// ensure a max line length of 120
		// https://eslint.org/docs/rules/max-len
		'max-len': ['error', { 'code': 120, ignoreComments: true }],

		// always use tab for indentation
		// indent case statement inside of switch
		'indent': ['error', 'tab', {
			SwitchCase: 1
		}],

		// allow _ in property names and destructured names
		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/camelcase.md
		'@typescript-eslint/camelcase': [
			'error',
			{ 'properties': 'never', 'ignoreDestructuring': true },
		],

		// allow function expressions without explit returns
		// https://github.com/typescript-eslint/typescript-eslint/blob/v2.30.0/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
		'@typescript-eslint/explicit-function-return-type': [
			'error',
			{
				'allowExpressions': true,
				'allowTypedFunctionExpressions': true,
				'allowHigherOrderFunctions': true
			}
		],

		// disabled rules
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/camelcase': 'off'
	},
};

module.exports = config;
