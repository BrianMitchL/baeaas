module.exports = {
    name: 'Version',
    url: '/version',
    fields: [],
    register: (app, output, version) => {
        return app.get('/version', (req, res) => {
            const message = 'Version ' + version;
            output(req, res, message);
        });
    }
};
