const fs = require('fs');
const path = require('path');
const { task, sh } = require('watari');
const shell = require('shelljs');

const DIST = 'dist';
const CONFIGS = 'configs';

function clean() {
	shell.rm('-rf', DIST);
}

function prettier() {
	const configFile = path.join(CONFIGS, 'prettier.config.js');
	const sourcePath = `"src/**/*.ts*"`;
	const testPath = `"test/**/*.ts"`;

	sh([
		'npx --no-install prettier',
		'--write',
		`--config ${configFile}`,
		sourcePath,
		fs.existsSync('test') ? testPath : '',
	]);
}

function eslint() {
	const configFile = path.join(CONFIGS, 'eslint.config.js');

	sh([
		'npx --no-install eslint',
		`--config ${configFile}`,
		'--fix',
		'--ext .ts,.tsx,.js',
		'src',
		fs.existsSync('test') ? 'test' : ''
	]);
}

function fmt() {
	prettier();
	eslint();
}

function build() {
	sh('npx --no-install tsc');
}

function test() {
	sh('npx --no-install jest');
}

function testw() {
	sh('npx --no-install jest --watch');
}

function cover() {
	sh('npx --no-install jest --coverage');
}

function coverv() {
	sh('start dist/.coverage/lcov-report/index.html');
}

task({
	clean,
	fmt,
	build,
	test,
	testw,
	cover,
	coverv
});