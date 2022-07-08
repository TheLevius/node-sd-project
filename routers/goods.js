const {
    Router
} = require('express');

const goodsRoute = new Router();

goodsRoute.get('/', (req, res) => {
    res
        .status(200)
        .send([{
            name: "good 1"
        }, {
            name: "good 2"
        }])
})
const def = (server) => {
    server.use('/goods', goodsRoute);
}
module.exports = def;