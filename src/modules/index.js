/**
 * registry Pattern with requireModule in Webpack to load file from path file
 */
import _set from 'lodash/set';

const requireModule = require.context('.', true, /\.js$/);
const modules = {};

const files = requireModule
  .keys()
  .filter(filePath => filePath !== './index.js')
  .map(filePath => {
    return {
      path: filePath.replace(/(\.\/|\.js)/g, ''),
      content: requireModule(filePath).default,
    };
  });

files.forEach(file => {
  let node = file.path.split('/').join('.modules.');
  _set(modules, node, file.content);
});

export default modules;
