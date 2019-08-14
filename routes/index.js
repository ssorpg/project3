module.exports = function (app) {
    require('./users-routes')(app);
    require('./communities-routes')(app);
    require('./posts-routes')(app);

    app.use(function (req, res, next) { // 404 handler
        let err = new Error('Page Not Found');
        err.statusCode = 404;
        next(err);
    });
}