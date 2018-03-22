import path from 'path';
import fs from 'fs';

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appNodeModules: resolveApp('node_modules'),
  appHtml: resolveApp('app.html'),
  appIndexJs: resolveApp('index.js'),
  appSrc: resolveApp('./'),
  yarnLockFile: resolveApp('yarn.lock'),
};
