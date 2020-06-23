const fs = require('fs');
const path = require('path');
const { task, sh } = require('watari');
const shell = require('shelljs');
const { execSync } = require('child_process');
const semver = require('semver');

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

function pack() {	
	const outputDir = path.join(DIST, 'src');
	if(!fs.existsSync(outputDir)) {
		console.log('please run `node do build` first');
		process.exit(1);
	}

    shell.cp('-u', 'package.json', outputDir);
    sh('npm pack', { cwd: outputDir });
}

function pub() {
	const package = JSON.parse(fs.readFileSync('./package.json'));
	const packageVersion = package.version;
	let npmVersion = '';
	
	// get current npm version
	try {
		npmVersion = execSync(`npm view ${package.name} version`, {
			stdio: 'pipe'
		}).toString().trim();
	}
	catch(e) {
		const stderrr = ((e.stderr && e.stderr.toString()) || '');
		if(e.status === 1 && stderrr.indexOf('npm ERR! code E404') !== -1) {
			npmVersion = '0.0.0';
		}
		else {
			throw e;
		}
	}

	const isNextVersion = semver.gt(packageVersion, npmVersion);	
	if(!isNextVersion) {
		console.log(`npm version is newer or same, npm=${npmVersion} package=${packageVersion}`);
		console.log('no action taken');
		process.exit(0);
	}

	const outputDir = path.join(DIST, 'src');
	if(!fs.existsSync(outputDir)) {
		console.log('please run `node do build` first');
		process.exit(1);
	}

	shell.cp('-u', 'package.json', outputDir);	
	sh(`npm publish --access public`, { cwd: outputDir });
}

task({
	clean,
	fmt,
	build,
	test,
	testw,
	cover,
	coverv,
	pack,
	pub
});