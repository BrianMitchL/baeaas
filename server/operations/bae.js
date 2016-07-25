regexp = require('../regexp');

module.exports = {
    name: "BAE",
    url: '/bae/:text',
    fields: [
        {
            name: 'Text',
            field: 'text'
        }
    ],
    register: function(app, output) {
        return app.get('/bae/:text', function(req, res) {
            var message;
            message = req.params.text.replace(regexp.regexp(), "bae");
            return output(req, res, message);
        });
    }
};