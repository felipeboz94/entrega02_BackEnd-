"use strict";
exports.__esModule = true;
exports.readAllData = exports.insertData = void 0;
function insertData(path, data) {
    var fs = require('fs');
    fs.writeFileSync(path, JSON.stringify(data));
}
exports.insertData = insertData;
function readAllData(path) {
    var fs = require('fs');
    try {
        var readedData = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return readedData;
    }
    catch (err) {
        console.log(err);
        console.log('CUIDADO: Error al acceder al archivo con datos');
    }
}
exports.readAllData = readAllData;
