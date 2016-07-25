var BAEAAS, baeaas, path, port;

path = require('path');

BAEAAS = require(path.resolve(__dirname, 'baeaas'));

baeaas = new BAEAAS({
    renderersPath: path.resolve(__dirname, 'renderers'),
    operationsPath: path.resolve(__dirname, 'operations')
});

port = process.env.PORT || 3000;

baeaas.start(port);