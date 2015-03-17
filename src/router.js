const Parse = require("../../koa-parse-restapi");
const config = require("./config");
const Router = require("koa-router");
const meepbee = new Parse(config.appId, config.restApiKey);

const jwt = require("jsonwebtoken");


let capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

let router = new Router();

router.get("/", function*() {
  this.body = "hi";
});

router.get("/login", function*() {
  let user =
    yield meepbee.loginUser("nukr", "akgeto0g");
  let sessionToken = JSON.parse(user.body).sessionToken;
  const token = jwt.sign({
    sessionToken: sessionToken
  }, "secret", {
    algorithm: "HS512"
  });
  this.body = token;
});

//router.get("/verify", function* () {

//let token = this.req.headers["x-meepbee-token"];

//let decoded = yield function () {
//return new Promise(function (resolve, reject) {
//jwt.verify(token, "secret", function (err, decoded) {
//if (err) {
//throw new Error(err);
//}
//resolve(decoded);
//});
//});
//};

//let meepbee = new Parse(config.appid, config.restApiKey, decoded.sessionToken);
//let user = yield meepbee.getCurrentUser();
//this.body = user;
//});

router.get("/users", function*() {
  this.body =
    yield meepbee.getUsers();
});

router.post("/roles", function*() {
  let roles =
    yield meepbee.createRole({
      "name": "tester",
      "ACL": {
        "*": {
          "read": true
        }
      }
    });
  this.body = roles.body;
});

router.get("/roles/:id", function*() {
  let role =
    yield meepbee.getRole(this.params.id);
  this.body = role.body;
});

router.get("/roles", function*() {
  let roles =
    yield meepbee.getRoles();
  this.body = roles.body;
});

router.delete("/roles/:id", function*() {
  let role =
    yield meepbee.deleteRole(this.params.id);
  this.body = role.body;
});

router.put("/roles/:id", function*() {
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

router.get("/:table", function*() {
  let objectName = capitalizeFirstLetter(this.params.table);
  let objects =
    yield meepbee.getObjects(objectName);
  this.body = objects;
});

router.get("/:table/:id", function*() {
  let objectName = capitalizeFirstLetter(this.params.table);
  let object =
    yield meepbee.getObject(objectName, this.params.id);
  this.body = object;
});

module.exports = router;

