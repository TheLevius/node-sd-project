const {
    Router
} = require('express');
const {
    outLog
} = require('../utils');
const {
    readdir
} = require('fs/promises');
const path = require('path');
const {
    compareStrings,
    compareStringInArray
} = require('../utils/compare');
const {
    readdirSync
} = require('fs');

const rootRouter = new Router();
const notProcessing = ['index.js', 'temp.js'];

const filesFilter = (files) => files.filter((file) => {
    return compareStrings(path.extname(file), '.js') && !compareStringInArray(file, notProcessing);
});

const dynamicLoadFiles = (files, server) => {
    if (!files.length) return;
    files.forEach((file) => {
        const fileRoute = require('./' + file);
        const fileName = path.basename(file, '.js');
        if (typeof fileRoute === 'function') {
            console.log(`✅ route: ${fileName}`);
            fileRoute(server);
        } else {
            console.log(`❌ not loaded route: ${fileName} because not "module.exports" function`);
        }
    });
};

// rootRouter.get('/modules', async (req, res) => {
// const data = await readdir(__dirname, 'utf-8');

// const filteredModules = moduleFilter(data);
// dynamicLoadModuleLogger(filteredModules);
// res
//     .status(200)
//     .send(compareStringInArray('temp.js', filteredModules));
// });
const def = (server) => {
    const files = readdirSync(__dirname, 'utf-8');
    const filteredFiles = filesFilter(files);
    return dynamicLoadFiles(filteredFiles, server);

}
module.exports = def;