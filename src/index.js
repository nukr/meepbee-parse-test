const koa = require('koa');
const router = require('koa-router');
const Parse = require('../../koa-parse-restapi');
const config = require('./config');
const meepbee = new Parse(config.appId, config.restApiKey);

const app = koa();
let port = process.env.port || 5000;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

app.use(router(app));

app.get('/', function*() {
  this.body = 'hi';
});

app.get('/login', function*() {
  let user =
    yield meepbee.loginUser('nukr', 'akgeto0g');
  this.body = user.body;
});

app.get('/users', function*() {
  let users =
    yield meepbee.getUsers();
  this.body = users.body;
})

app.post('/roles', function*() {
  let roles =
    yield meepbee.createRole({
      "name": "tester",
      "ACL": {
        "*": {
          "read": true
        }
      }
    });
  this.body = roles.body
});

app.get('/roles/:id', function *() {
  let role =
    yield meepbee.getRole(this.params.id)
  this.body = role.body;
});

app.get('/roles', function*() {
  let roles =
    yield meepbee.getRoles();
  this.body = roles.body;
});

app.delete('/roles/:id', function *() {
  let role =
    yield meepbee.deleteRole(this.params.id)
  this.body = role.body;
});

app.put('/roles/:id', function *() {
  let role =
    yield meepbee.updateRole(this.params.id, {
      "ACL": {
        "*": {
          "update": true
        }
      }
    });
  this.body = role.body;
});

app.get('/:table', function*() {
  let objectName = capitalizeFirstLetter(this.params.table);
  let objects =
    yield meepbee.getObjects(objectName);
  this.body = objects.body
});

app.get('/:table/:id', function*() {
  let objectName = capitalizeFirstLetter(this.params.table);
  let product =
    yield meepbee.getObject(objectName, this.params.id);
  this.body = product.body;
});

app.listen(port);
console.log('server start on port %d', port);
