var express = require('express');
var faye = require('faye');

// Faye setup

var fayeServer = new faye.NodeAdapter({ mount: '/' });
var fayeClient = fayeServer.getClient();

// App setup

var app = express();
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

app.post('/message', function(req, res) {
  fayeClient.publish('/chatroom', {
    userId: req.body.userId,
    message: req.body.message
  });

  res.send(200);
});

fayeServer.listen(8001);
app.listen(8000);
