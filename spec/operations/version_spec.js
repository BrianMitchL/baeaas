const operation = require(__dirname +  '/../../server/operations/version');

describe('/version', () => {
    it('should have the correct name', () => {
        return expect(operation.name).toEqual('Version');
    });
    it('should have the correct url', () => {
        return expect(operation.url).toEqual('/version');
    });
    it('should have the correct fields', () => {
        return expect(operation.fields).toEqual([]);
    });
    return describe('register', () => {
        it('should call app.get with correct url', () => {
            const app = {
                get: jasmine.createSpy()
            };
            operation.register(app, null, 1);
            expect(app.get).toHaveBeenCalled();
            return expect(app.get.argsForCall[0][0]).toEqual('/version');
        });
        return it('should call output with correct params', () => {
            let func = null;
            const app = {
                get: (url, fn) => {
                    return func = fn;
                }
            };
            const output = jasmine.createSpy();
            operation.register(app, output, 1234);
            const req = {
                params: {}
            };
            func(req, 'RES');
            return expect(output).toHaveBeenCalledWith(req, 'RES', 'Version 1234');
        });
    });
});
