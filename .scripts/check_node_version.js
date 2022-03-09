const semver = require('semver');
const { exec } = require('child_process');
const { engines } = require('../package');
const version = engines.node;
if (!semver.satisfies(process.version, version)) {
  throw new Error(`The current node version ${process.version} does not satisfy the required version ${version} .`);
}

exec('npm -v', (error, stdout) => {
  if (error) {
    throw new Error('NPM not installed');
  }
  const npmVersion = stdout.split('\n')[0];
  if (!semver.satisfies(npmVersion, engines.npm)) {
    throw new Error(`The current npm version ${npmVersion} does not satisfy the required version ${engines.npm} .`);
  }
});
