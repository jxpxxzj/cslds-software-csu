const fs = require('fs-extra');
const path = require('path');
const json = fs.readJSONSync(path.resolve(__dirname, './config.json'));

module.exports = json;
