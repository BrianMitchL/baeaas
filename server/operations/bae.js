var regexp = require('../regexp');

module.exports = {
    name: 'BAE',
    url: '/bae/:text',
    fields: [
        {
            name: 'Text',
            field: 'text'
        }
    ],
    register: (app, output) => {
        return app.get('/bae/:text', (req, res) => {
            var message = req.params.text.replace(regexp.regexp(), 'bae');
            return output(req, res, message);
        });
    }
};
