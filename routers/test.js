const {
    Router
} = require('express');

const testRoute = new Router();

testRoute.get('/', (req, res) => {
    res
        .status(200)
        .send('Hello from test route');
})

testRoute.post('/', (req, res) => {
    res.status(200).send(req.body);
})

const def = (server) => {
    server.use('/test', testRoute);
}

module.exports = def;