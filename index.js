/**
 * The MIT License
 *
 * Copyright (c) 2015, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var registry = require('./widget-registry');
var app = express();

// configure express
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// rest api endpoint to list available endpoints
app.get('/v1', function(req, res, next){
  var endpoints = {
    widgets: '/v1/widgets'
  };
  res.json(endpoints);
});

// rest api endpoint to list all widgets
app.get('/v1/widgets', function(req, res, next){
  registry.getAll().then(function(widgets){
    res.json(widgets);
  }).catch(function (e) {
    next({
      status: 500,
      message: 'could not fetch widgets',
      error: e
    });
  });
});

// rest api endpoint to get single widget by its name
app.get('/v1/widgets/:name', function(req, res, next){
  var name = req.params.name;
  registry.get(name).then(function(widget){
    res.json(widget);
  }).catch(function (e) {
    next({
      status: 500,
      message: 'could not fetch widget ' + name,
      error: e
    });
  });;
});

// handle errors
app.use(function(err, req, res, next) {
  if (!err.status){
    err.status = 500;
  }
  res.status(err.status);
  res.json(err);
});

// start server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
