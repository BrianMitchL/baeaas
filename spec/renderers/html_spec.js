const renderer = require(__dirname + '/../../server/renderers/html');

describe('HTML Renderer', () => {
    it('should have the correct name', () => {
        return expect(renderer.name).toEqual('HTML');
    });
    it('should have the correct mime type', () => {
        return expect(renderer.mime).toEqual('text/html');
    });
    return describe('render', () => {
        it('should call res.set with Content-Type header', () => {
            const req = {
                message: 'ONE'
            };
            const res = {
                set: jasmine.createSpy(),
                send: jasmine.createSpy()
            };
            renderer.render(req, res);
            return expect(res.set).toHaveBeenCalledWith('Content-Type', 'text/html');
        });
        it('should call res.send with correct params', () => {
            const req = {
                message: 'BAE'
            };
            const res = {
                set: jasmine.createSpy(),
                send: jasmine.createSpy()
            };
            renderer.render(req, res);
            return expect(res.send).toHaveBeenCalledWith(`<!DOCTYPE html>
        <html>
        <head>
            <title>BAEaaS</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/2.26.4/css/uikit.min.css">
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div class="uk-container uk-container-center">
                <header>
                    <h1>BAEaaS<small class="uk-align-medium-right">BAE as a Service</small></h1>
                </header>
                <p>BAE</p>
                <hr>
                <footer>
                    <p>Contribute on <a href="https://github.com/BrianMitchL/baeaas">GitHub</a></p>
                </footer>
            </div>
        </body>
        </html>`);
        });
        return it('should sanitize params', () => {
            const req = {
                message: '<BAE>BAE</BAE>'
            };
            const res = {
                set: jasmine.createSpy(),
                send: jasmine.createSpy()
            };
            renderer.render(req, res);
            return expect(res.send).toHaveBeenCalledWith(`<!DOCTYPE html>
        <html>
        <head>
            <title>BAEaaS</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/2.26.4/css/uikit.min.css">
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div class="uk-container uk-container-center">
                <header>
                    <h1>BAEaaS<small class="uk-align-medium-right">BAE as a Service</small></h1>
                </header>
                <p>&lt;BAE&gt;BAE&lt;/BAE&gt;</p>
                <hr>
                <footer>
                    <p>Contribute on <a href="https://github.com/BrianMitchL/baeaas">GitHub</a></p>
                </footer>
            </div>
        </body>
        </html>`);
        });
    });
});
