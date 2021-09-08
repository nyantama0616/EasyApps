"use strict";

const path = require("path");

exports.PORT = 5000;
exports.ROOT = path.dirname(path.dirname(__dirname))
exports.TOP_PAGE = `${exports.ROOT}/public/index.html`;
