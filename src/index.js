const koa = require('koa');
const router = require('koa-router');
const Parse = require('koa-parse-restapi');
const meepbee = new Parse('DHPbawPXsk9VM697XtD0UNuYAuaxuxc8tEXoIquY', 'RtmDHDn6h1ehzn9sclbyky5IeWa6Sw5aOJTVKYTt')



const app = koa();
let port = process.env.port || 5000;

app.use(router(app));

app.get('/', function*() {
    this.body = 'hi';
});

app.get('/products', function*() {
    var products =
        yield meepbee.classes('Products').getAll();

    this.body = products.body;
})

app.get('/products/:productId', function *() {
    var productId = this.params.productId;
    var product = yield meepbee.classes('Products').get(productId);
    this.body = product.body;
})

app.get('/orders', function*() {
    var orders =
        yield meepbee.classes('Orders').getAll();

    this.body = orders.body
})

app.get('/orders/:orderId', function *() {
    var orderId = this.params.orderId;
    var order = yield meepbee.classes('Orders').get(orderId);
    this.body = order.body;
})

app.listen(port);
console.log('server start on port %d', port);