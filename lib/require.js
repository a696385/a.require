/**
 * Created by andy on 08.09.13.
 */

var $path = require('path');

var _require = require;


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

var _options = {
    root: __dirname,
    names: {
        module: 'modules',
        model: 'models',
        controller: 'controllers'
    }
};

/**
 * Require Function
 * @param {String} dest
 * @returns {Object}
 */
var Require = function(dest){
    return _require(Require.path(dest));
};

/**
 * Init module
 * @param {Object} options
 */
Require.init = function(options){
    var _extend = function(obj, defaultObj){
        for (var key in defaultObj) if (defaultObj.hasOwnProperty(key)){
            if (typeof defaultObj[key] === 'object' && !Array.isArray(defaultObj[key])){
                if (obj[key] == null) obj[key] = {};
                obj[key] = _extend(obj[key], defaultObj[key])
            } else if (obj[key] == null) {
                obj[key] = defaultObj[key];
            }
        }
        return obj;
    };
    _options = _extend(options, _options);
};

/**
 * Get Path to destination
 * @param {String} dest
 * @returns {String}
 */
Require.path = function(dest){

    var join = function(){
        var args = Array.prototype.slice.call(arguments);
        var toJoin = [];
        for(var i = 0, len = args.length; i < len; i++){
            if (!Array.isArray(args[i])) args[i] = [args[i]];
            toJoin = toJoin.concat(args[i]);
        }
        return $path.join.apply($path, toJoin);
    };

    if (dest.length === 0) throw new Error('Destination must be not null');
    var parts = dest.split(':');
    // path("a.config")
    if (parts.length === 1){
        if (parts[0].indexOf('/') == -1) return dest;
        else return $path.resolve(join(_options.root, dest));
    }

    var _type = 'file',
        _module = '',
        _path = '',
        _result = [];
    // path("frontend:/controllers/some")
    if (parts.length === 2) {
        _module = parts[0];
        _path = parts[1];
     // path("controller:frontend.bidder:./some")
    } else if (parts.length === 3) {
        _type = parts[0];
        _module = parts[1];
        _path = parts[2];
    } else throw  new Error("Wrong destination: " + dest);

    if (_options.names[_type] == null) _type = 'file';
    _module.split('.').forEach(function(el){
        if (_result.length > 0){
            _result.push(_options.names["module"]);
        }
        _result.push(el)
    });
    if (_type !== 'file' && _options.names[_type] != null){
        _result.push(_options.names[_type]);
    }

    _result = join(_options.root, _result, _path);
    return $path.resolve(_result);
};

module.exports = exports = Require;