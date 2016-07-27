const renderer = require(__dirname + '/../../server/renderers/text');

describe('TEXT Renderer', () => {
    it('should have the correct name', () => {
        return expect(renderer.name).toEqual('Text');
    });
    it('should have the correct mime type', () => {
        return expect(renderer.mime).toEqual('text/plain');
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
            return expect(res.set).toHaveBeenCalledWith('Content-Type', 'text/plain');
        });
        return it('should call res.send with correct params', () => {
            const req = {
                message: 'ONE'
            };
            const res = {
                set: jasmine.createSpy(),
                send: jasmine.createSpy()
            };
            renderer.render(req, res);
            return expect(res.send).toHaveBeenCalledWith('ONE');
        });
    });
});
