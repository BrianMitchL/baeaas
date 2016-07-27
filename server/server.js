const path = require('path');

const BAEAAS = require(path.resolve(__dirname, 'baeaas'));

const baeaas = new BAEAAS({
    renderersPath: path.resolve(__dirname, 'renderers'),
    operationsPath: path.resolve(__dirname, 'operations')
});

const port = process.env.PORT || 3000;

baeaas.start(port);
