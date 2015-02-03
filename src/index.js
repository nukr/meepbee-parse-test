const koa = require('koa');
const router = require('./router');
const app = koa();
let port = process.env.port || 5000;

app.use(router.middleware());
app.listen(port);
console.log('server start on port %d', port);
