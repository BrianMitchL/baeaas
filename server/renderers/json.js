module.exports = {
    name: 'JSON',
    mime: 'application/json',
    render: function(req, res) {
        return res.jsonp({
            message: req.message
        });
    }
};