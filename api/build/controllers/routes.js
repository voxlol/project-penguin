'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Find Routes
// const routes = fs.readdirSync('./');
// const routes = _.without(path.basename('./', '.js'), 'router');

console.log(routes);

var router = _express2.default.Router();

// router.use('/api/dummy', routes);

exports.default = routes;
//# sourceMappingURL=routes.js.map
