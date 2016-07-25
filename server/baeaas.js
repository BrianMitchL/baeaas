var BAEAAS, bodyParser, express, fs, npmPackage, path,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

express = require('express');
bodyParser = require('body-parser');
fs = require('fs');
path = require('path');
npmPackage = require(path.resolve(__dirname, '../package.json'));
regexp = require('./regexp');


module.exports = BAEAAS = (function() {
    BAEAAS.prototype.VERSION = npmPackage.version;

    function BAEAAS(options) {
        this.process = bind(this.process, this);
        this.output = bind(this.output, this);
        this.start = bind(this.start, this);
        this.loadOperations = bind(this.loadOperations, this);
        this.loadRenderers = bind(this.loadRenderers, this);
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
        this.app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            return next();
        });
        this.loadOperations(operationsPath);
        this.app.use(express["static"]('./public'));
        this.app.get('/', this.sendIndex);
        this.app.get('index.html', this.sendIndex);
        this.app.options("*", function(req, res) {
            return res.end();
        });
        this.loadRenderers(renderersPath);
    }

    BAEAAS.prototype.sendIndex = function(req, res) {
        return res.sendfile(path.join(__dirname + "/public/index.html"));
    };

    BAEAAS.prototype.loadRenderers = function(path) {
        var file, i, len, ref, renderer, results;
        ref = fs.readdirSync(path);
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
            file = ref[i];
            renderer = require(path + '/' + file);
            this.formatsArray.push(renderer.mime);
            results.push(this.formats[renderer.mime] = renderer.render);
        }
        return results;
    };

    BAEAAS.prototype.loadOperations = function(path) {
        var file, i, len, operation, ref, router;
        router = express.Router();
        ref = fs.readdirSync(path);
        for (i = 0, len = ref.length; i < len; i++) {
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
        router.get('/operations', (function(_this) {
            return function(req, res) {
                return res.send(_this.operationsArray);
            };
        })(this));
        router.get('/bae/:text', (function(_this) {
            return function(req, res) {
                var message = req.params.text.replace(regexp.regexp(), "bae");
                return _this.output(req, res, message);
            };
        })(this));
        return this.app.use(router);
    };

    BAEAAS.prototype.start = function(port) {
        this.app.listen(port);
        return console.log("BAEAAS v" + this.VERSION + " Started on port " + port);
    };

    BAEAAS.prototype.output = function(req, res, message) {
        req.message = message;
        var rout = (function(_this) {
            return function(req, res) {
                return _this.process(req, res, rout);
            };
        })(this);
        return rout(req, res);
    };


    BAEAAS.prototype.process = function(req, res) {
        var mime;
        mime = req.accepts(this.formatsArray);
        if (mime == null) {
            res.status(406);
            res.end();
            return;
        }
        this.formats[mime](req, res);
        return console.log(new Date().toISOString() + " " + req.method + " " + req.originalUrl + " [" + res.statusCode.toString() + "] " + JSON.stringify(req.body));
    };

    return BAEAAS;

})();