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
    res.send('{ "Error":"COD API ERROR: '+err+'" }');
  };
  switch (req.params.endpoint.toLowerCase()) {
    case 'multiplayer':
      API.MWmp(req.params.gamerTag, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'multiplayer-matches':
      var start = req.params.startTime ? req.params.startTime : 0;
      var stop = req.params.stopTime ? req.params.stopTime : 0;
      API.MWcombatmpdate(req.params.gamerTag, start, stop, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'leaderboard':
      var page = req.params.page ? req.params.page : 1;
      API.MWleaderboard(page, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'warzone':
      API.MWwz(req.params.gamerTag, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'warzone-matches':
      var start = req.params.startTime ? req.params.startTime : 0;
      var stop = req.params.stopTime ? req.params.stopTime : 0;
      API.MWcombatwzdate(req.params.gamerTag, start, stop, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'coldwar':
      API.CWmp(req.params.gamerTag, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'coldwwar-matches':
      var start = req.params.startTime ? req.params.startTime : 0;
      var stop = req.params.stopTime ? req.params.stopTime : 0;
      API.CWcombatdate(req.params.gamerTag, start, stop, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'coldwwar-fullmatchinfo':
      var matchId = req.params.matchId ? req.params.matchId : 0;
      API.CWFullMatchInfo(matchId, req.params.platform).then(normalSuccess).catch(normalError);
      break;
    case 'map-list':
      API.MWMapList(req.params.platform).then(normalSuccess).catch(normalError);
      break;
  }
});

module.exports = routes;