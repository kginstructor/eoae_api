var express = require('express');
var router = express.Router();
const API = require('call-of-duty-api')({ platform: "battle" });
API.login(process.env.COD_USERNAME, process.env.COD_PASSWORD).then(data => {
  console.log("Got a valid response to login: ", data);
}).catch(err => {
  console.error("LOGIN FAILED: ", err);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  API.MWBattleData('KillingGame#1239').then(data => {
    res.json(data);
  }).catch(err => {
    res.send("COD API ERROR: "+err);
  });
});

module.exports = router;
