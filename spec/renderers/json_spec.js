const renderer = require(__dirname + '/../../server/renderers/json');

describe('Json/JsonP Renderer', () => {
    it('should have the correct name', () => {
        return expect(renderer.name).toEqual('JSON');
    });
    it('should have the correct mime type', () => {
        return expect(renderer.mime).toEqual('application/json');
    });
    return describe('render', () => {
        return it('should call res.jsonp with correct params', () => {
            const req = {
                message: 'ONE'
            };
            const res = {
                jsonp: jasmine.createSpy()
            };
            renderer.render(req, res);
            return expect(res.jsonp).toHaveBeenCalledWith({
                message: 'ONE'
            });
        });
    });
});
