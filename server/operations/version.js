module.exports = {
    name: "Version",
    url: '/version',
    fields: [],
    register: function(app, output, version) {
        return app.get('/version', function(req, res) {
            var message = "Version " + version;
            return output(req, res, message);
        });
    }
};
