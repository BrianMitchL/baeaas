module.exports = {
    name: 'Text',
    mime: 'text/plain',
    render: (req, res) => {
        res.set('Content-Type', 'text/plain');
        return res.send(req.message);
    }
};
