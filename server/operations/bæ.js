const regexp = require('../regexp');

module.exports = {
    name: 'BÆ',
    url: '/bæ/:text',
    fields: [
        {
            name: 'Text',
            field: 'text'
        }
    ],
    register: (app, output) => {
        return app.get('/b%C3%A6/:text', (req, res) => {
            const message = req.params.text.replace(regexp(), 'bæ');
            output(req, res, message);
        });
    }
};
