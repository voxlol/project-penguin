'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').all(function (req, res, next) {
  next();
}).get(function (req, res, next) {
  res.send('Gotcha!');
});

exports.default = router;
//# sourceMappingURL=dummy.js.map
