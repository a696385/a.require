/**
 * Created by Andy <andy@away.name> on 09.09.13.
 */
var _require = require('../index');
_require.init({root: __dirname});
[
    'a.config',
    './index',
    '../package.json',
    'frontend:controller/index.js',
    'frontend.auth:controller/index.js',
    'controller:frontend:index.js',
    'controller:frontend.auth:index.js',
    'model:frontend:index.js',
    'model:frontend.auth:index.js'
].forEach(function(el){
    console.log(el + ':', _require.path(el));
});

console.log(_require('../lib/require'));
