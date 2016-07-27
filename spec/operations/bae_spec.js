const operation = require(__dirname + '/../../server/operations/bae');

describe('/bae', () => {
    it('should have the correct name', () => {
        return expect(operation.name).toEqual('BAE');
    });
    it('should have the correct url', () => {
        return expect(operation.url).toEqual('/bae/:text');
    });
    it('should have the correct fields', () => {
        return expect(operation.fields).toEqual([
            {
                name: 'Text',
                field: 'text'
            }
        ]);
    });
    return describe('register', () => {
        it('should call app.get with correct url', () => {
            const app = {
                get: jasmine.createSpy()
            };
            operation.register(app, null);
            expect(app.get).toHaveBeenCalled();
            return expect(app.get.argsForCall[0][0]).toEqual('/bae/:text');
        });
        return it('should call output with correct params', () => {
            let func = null;
            const app = {
                get: (url, fn) => {
                    return func = fn;
                }
            };
            const output = jasmine.createSpy();
            operation.register(app, output);
            const req = {
                params: {
                    text: 'This a a test string, way'
                }
            };
            func(req, 'RES');
            return expect(output).toHaveBeenCalledWith(req, 'RES', 'This a a test string, bae');
        });
    });
});
