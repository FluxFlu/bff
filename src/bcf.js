#!/usr/bin/env node

if (require.main === module) {
    require("./script").main();
} else {
    module.exports = require("./lib");
}