/**
 * Created by andy on 08.09.13.
 */

var $path = require('path');


var Require = function(options){
    this.init(options);
};

Require.prototype.newInstance = function(options){
    return new Require(options);
};

Require.prototype.init = function(options){
    this._options = options;
    this._options.root = this._options.root || __dirname;
    this._options.delimiter = this._options.delimiter || '.';
    this._options.separator = this._options.separator || {};
    this._options.separator.left = this._options.separator.left || '[';
    this._options.separator.right = this._options.separator.right || ']';
    this._options.moduleName = this._options.moduleName || 'modules';
    this._options.modules = this._options.modules || {};
};

Require.prototype.path = function(dest){
    if (dest == '') return dest;
    if (dest.substr(0, 1) === ':'){
        dest = dest.substring(1);

        var param = dest.substring(0, dest.indexOf('/'));
        var value = this._options.modules[param];
        dest = dest.replace(param, value);

        dest = $path.join(this._options.root, dest);
    } else {
        while (dest.indexOf(this._options.separator.left) > -1){
            var param = dest.substring(dest.indexOf(this._options.separator.left) +1 , dest.indexOf(this._options.separator.right));
            var value = param.replace(new RegExp('\\.', 'g'), '/' + this._options.moduleName + '/');
            dest = dest.replace(this._options.separator.left + param + this._options.separator.right, value);
        }
        dest = $path.join(this._options.root, dest);
    }
    return $path.resolve(dest);
};

Require.prototype.require = function(fileName){
    return require(this.path(fileName));
};

module.exports = exports = Require;