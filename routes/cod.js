const router = require('express');
const routes = router();
const API = require('call-of-duty-api')();

API.login(process.env.COD_USERNAME, process.env.COD_PASSWORD).then(data => {
  console.log("Got a valid response to login: ", data);
}).catch(err => {
  console.error("LOGIN FAILED: ", err);
});

routes.all("/:endpoint/:gamerTag/:platform", function(req, res, next) {
  const normalSuccess = function(data) {
    res.json(data);
  };
  const normalError = function(err) {
    console.error(err);
    res.send('"Error":"COD API ERROR: '+err+'"');
  };
  switch (req.params.endpoint.toLowerCase()) {
    case 'multiplayer':
      API.MWmp(req.params.gamerTag, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'multiplayer-matches':
      API.MWcombatmpdate(req.params.gamerTag, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'leaderboard':
      API.MWleaderboard(req.params.gamerTag, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'warzone':
      API.MWwz(req.params.gamerTag, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'warzone-matches':
      API.MWcombatwzdate(req.params.gamerTag, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'map-list':
      API.MWMapList(req.params.platform).then(normalSuccess).catch(normalError);
      break;
  }
});

module.exports = routes;