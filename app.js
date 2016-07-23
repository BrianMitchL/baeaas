var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var router = express.Router();


var jsonParser = bodyParser.json() 
var urlencodedParser = bodyParser.urlencoded({ extended: true })



app.use(express.static(__dirname + '/public'));

app.get('/bae', urlencodedParser, function (req, res) {
  res.send(req.query.input.replace(/(?!bae|[0-9])[A-GJ-NP-TV-gj-np-tv-z][a][y]?/g, "bae"))
});

app.get('/bae/:text', urlencodedParser, function (req, res) {
  res.send(req.params.text)
});

app.get('/bae/:text/:more', urlencodedParser, function (req, res) {
  res.send(req.params.text + "   ---    " + req.params.more)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
