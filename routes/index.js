module.exports = function (app, expressWs) {
  require('./users-routes')(app);
  require('./communities-routes')(app);
  require('./posts-routes')(app);
  require('./images-routes')(app);
  require('./search-routes')(app);
  require('./websocket-routes')(app, expressWs);
  require('./events-routes')(app);
};