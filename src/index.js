const koa = require('koa');
const router = require('koa-router');
const Parse = require('../../koa-parse-restapi');
const config = require('./config');
const meepbee = new Parse(config.appId, config.restApiKey);

const app = koa();
let port = process.env.port || 5000;

app.use(router(app));

app.get('/', function*() {
    this.body = 'hi';
});

app.get('/products', function*() {
    let products =
        yield meepbee.getObjects('Products');

    this.body = products.body;
})

app.get('/products/:productId', function *() {
    let productId = this.params.productId;
    let product = yield meepbee.getObject('Products', productId);
    this.body = product.body;
})

app.get('/orders', function*() {
    let orders =
        yield meepbee.getObjects('Orders');

    this.body = orders.body
})

app.get('/orders/:orderId', function *() {
    let orderId = this.params.orderId;
    let order = yield meepbee.getObject('Orders', orderId);
    this.body = order.body;
})

app.get('/login', function *(){
  let user = yield meepbee.loginUser('nukr', 'akgeto0g');
  this.body = user.body;
});

app.get('/users', function *() {
  let users = yield meepbee.getUsers();
  this.body = users.body;
})

app.get('/comments', function *() {
    let orders =
        yield meepbee.getObjects('Comments');
    this.body = orders.body
});

app.listen(port);
console.log('server start on port %d', port);
