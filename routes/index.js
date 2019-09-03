module.exports = function (app, expressWs) {
  require('./users-routes')(app);
  require('./communities-routes')(app);
  require('./communityusers-routes')(app);
  require('./communityevents-routes')(app);
  require('./posts-routes')(app);
  require('./postcomments-routes')(app);
  require('./search-routes')(app);
  require('./websocket-routes')(app, expressWs);
};