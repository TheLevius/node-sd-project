const express = require('express');
const dynRouters = require('./routers/index');
// const testRouteDef = require('./routers/test');
const PORT = 2364;
const server = express();
server.use(express.urlencoded({
    extended: true
}));
server.use(express.json());

if (typeof dynRouters === 'function') {
    dynRouters(server);
}

server.listen(PORT, () => {
    console.log('server started on port: ' + PORT);
});