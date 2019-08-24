module.exports = function (app) {
    require('./users-routes')(app);
    require('./communities-routes')(app);
    require('./posts-routes')(app);
    require('./images-routes')(app);
    require('./search-routes')(app);

    app.use(function (req, res, next) { // 404 handler
        throw { status: 404, msg: 'Page not found.'};
    });
};