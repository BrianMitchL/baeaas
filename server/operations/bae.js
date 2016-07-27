const regexp = require('../regexp');

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
            const message = req.params.text.replace(regexp(), 'bae');
            output(req, res, message);
        });
    }
};
