module.exports = {
    name: 'Version',
    url: '/version',
    fields: [],
    register: (app, output, version) => {
        return app.get('/version', (req, res) => {
            var message = 'Version ' + version;
            return output(req, res, message);
        });
    }
};
