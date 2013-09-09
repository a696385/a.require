a.require for Node.js
=========

Require manager for Node.js. Can execute same function as system `require` and some else

Usage
----------
**Install with npm**

```
npm install a.require 
```

**Configurate at first**

```javascript
var _require = require('a.require');
_require.init({root: __dirname});
```

**Try it**

Load Node.js module
```javascript
var fs = _require('fs')
```

Load javascript file from root location
```javascript
var simple = _require('./simple')
```

For example you has some file structure like this
```bash
application$ /private/tmp
├── app
│   ├── helpers
│   ├── modules
│   │   ├── core
│   │   │   └── models
│   │   │       └── settings.js
│   │   └── frontend
│   │       ├── controllers
│   │       │   └── index.js
│   │       ├── dao
│   │       │   └── posts.js
│   │       ├── models
│   │       │   └── posts.js
│   │       └── modules
│   │           ├── admin
│   │           │   ├── controllers
│   │           │   │   └── index.js
│   │           │   └── models
│   │           │       └── profile.js
│   │           └── auth
│   │               └── controllers
│   │                   └── users.js
│   └── utils
│       └── request.js
└── config
    └── app.yaml

```
Get `index.js` controller from `frontend`

```javascript
var indexFrontend = _require("controller:app.frontend:index")
```

Get `post.js` model from `frontend`
```javascript
var postModelFrontend = _require("model:app.frontend:posts")
```

Get `posts.js` dao from `frontend`
```javascript
_require.init({names: {'dao': 'dao'}});
var postsDAOFrontend = _require("dao:app.frontend:posts")
```

Get `index.js` controller from `frontend/admin`
```javascript
var indexAuthFrontend = _require("controller:app.frontend.auth:index")
```

Get `request` from `utils`
```javascript
var request = _require("app:./utils/request")
var request = _require("./app/utils/request")
```

Extra
-----

**Get full path to file**
```javascript
var fullname = _require.path("config:app.yaml");
```

License
---------------------------------------

May be freely distributed under the MIT license

See `LICENSE` file

Copyright (c) 2013 - Sumskoy Andrew <andy@away.name>
