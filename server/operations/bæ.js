var regexp = require('../regexp');

module.exports = {
    name: 'BÆ',
    url: '/bæ/:text',
    fields: [
        {
            name: 'Text',
            field: 'text'
        }
    ],
    register: function(app, output) {
        return app.get('/b%C3%A6/:text', function(req, res) {
            var message = req.params.text.replace(regexp.regexp(), 'bæ');
            return output(req, res, message);
        });
    }
};
