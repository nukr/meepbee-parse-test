const koa = require('koa');
const router = require('koa-router');
const Parse = require('koa-parse-restapi');
const meepbee = new Parse(appId, restApiKey)



const app = koa();
let port = process.env.port || 5000;

app.use(router(app));

app.get('/', function*() {
    this.body = 'hi';
});

app.get('/products', function*() {
    let products =
        yield meepbee.classes('Products').getAll();

    this.body = products.body;
})

app.get('/products/:productId', function *() {
    let productId = this.params.productId;
    let product = yield meepbee.classes('Products').get(productId);
    this.body = product.body;
})

app.get('/orders', function*() {
    let orders =
        yield meepbee.classes('Orders').getAll();

    this.body = orders.body
})

app.get('/orders/:orderId', function *() {
    let orderId = this.params.orderId;
    let order = yield meepbee.classes('Orders').get(orderId);
    this.body = order.body;
})

app.listen(port);
console.log('server start on port %d', port);
