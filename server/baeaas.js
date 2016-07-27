const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const npmPackage = require(path.resolve(__dirname, '../package.json'));
const regexp = require('./regexp');
const bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; };


class BAEAAS {
    constructor(options) {
        this.process = bind(this.process, this);
        this.output = bind(this.output, this);
        this.start = bind(this.start, this);
        this.loadOperations = bind(this.loadOperations, this);
        this.loadRenderers = bind(this.loadRenderers, this);
        var operationsPath, renderersPath;
        this.VERSION = npmPackage.version;
        this.operations = {};
        this.operationsArray = [];
        this.formats = {};
        this.formatsArray = [];
        this.app = express();
        renderersPath = options.renderersPath || 'renderers';
        operationsPath = options.operationsPath || 'operations';
        this.app.use(bodyParser.json({
            extended: true,
            strict: false
        }));
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.text({
            extended: true
        }));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            return next();
        });
        this.loadOperations(operationsPath);
        this.app.use(express['static']('./public'));
        this.app.get('/', this.sendIndex);
        this.app.get('index.html', this.sendIndex);
        this.app.options('*', (req, res) => {
            return res.end();
        });
        this.loadRenderers(renderersPath);
    }

    sendIndex(req, res) {
        return res.sendFile(path.join(__dirname + '/public/index.html'));
    }

    loadRenderers(path) {
        let file, renderer;
        const ref = fs.readdirSync(path);
        for (let i = 0; i < ref.length; i++) {
            file = ref[i];
            renderer = require(path + '/' + file);
            this.formatsArray.push(renderer.mime);
            this.formats[renderer.mime] = renderer.render;
        }
    }

    loadOperations(path) {
        let file, operation;
        const router = express.Router();
        const ref = fs.readdirSync(path);
        for (let i = 0; i < ref.length; i++) {
            file = ref[i];
            operation = require(path + '/' + file);
            operation.register(router, this.output, this.VERSION);
            this.operationsArray.push({
                name: operation.name,
                url: operation.url,
                fields: operation.fields
            });
            this.operations[operation.url] = operation;
        }
        router.get('/operations', (req, res) => {
            res.send(this.operationsArray);
        });
        router.get('/bae/:text', (req, res) => {
            const message = req.params.text.replace(regexp(), 'bae');
            this.output(req, res, message);
        });
        this.app.use(router);
    }

    start(port) {
        this.app.listen(port);
        console.log(`BAEAAS v${this.VERSION} Started on port ${port}`);
    }

    output(req, res, message) {
        req.message = message;
        this.process(req, res);
    }

    process(req, res) {
        const mime = req.accepts(this.formatsArray);
        if (mime === null) {
            res.status(406);
            res.end();
            return;
        }
        this.formats[mime](req, res);
        return console.log(new Date().toISOString() + ' ' + req.method + ' ' + req.originalUrl + ' [' + res.statusCode.toString() + '] ' + JSON.stringify(req.body));
    }
}

module.exports = BAEAAS;
