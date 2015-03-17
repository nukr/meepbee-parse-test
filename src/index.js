const koa = require("koa");
const favicon = require("koa-favicon");
const router = require("./router");
const app = koa();
let port = process.env.port || 5000;

app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(router.middleware());
app.listen(port);
console.log("server start on port %d", port);
