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

const showErrorLoadingModule = (moduleName, errorMessage) => {
    console.log(`❌ not loaded route: ${moduleName} because "${errorMessage}"`);
}

const filesFilter = (files, notProcessing = []) => files.filter((file) => {
    return compareStrings(path.extname(file), '.js') && !compareStringInArray(file, notProcessing);
});

const dynamicModuleLoader = (files, server) => {
    if (!files.length) return;
    files.forEach((file) => {
        const fileRoute = require('./' + file);
        const moduleName = path.basename(file, '.js').toLowerCase();
        if (typeof fileRoute === 'function') {
            try {
                const route = new Router();
                fileRoute(route);
                server.use(`/${moduleName}`, route);

                console.log(`✅ route: ${moduleName}`);
            } catch (error) {
                showErrorLoadingModule(moduleName, error.message);
            }
        } else {
            console.log(`❌ not loaded route: ${moduleName} because not "module.exports" function`);
        }
    });
};

const def = (server) => {
    if (server) {
        const files = readdirSync(__dirname, 'utf-8');
        const notProcessing = ['index.js', 'temp.js'];
        const filteredFiles = filesFilter(files, notProcessing);
        return dynamicModuleLoader(filteredFiles, server);
    }

}
module.exports = def;