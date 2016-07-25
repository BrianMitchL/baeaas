var sanitizer = require('sanitizer');

module.exports = {
    name: 'HTML',
    mime: 'text/html',
    render: function (req, res) {
        message = sanitizer.escape(req.message);
        res.set('Content-Type', 'text/html');
        return res.send(`<!DOCTYPE html>
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
                <p>${message}</p>
                <hr>
                <footer>
                    <p>Contribute on <a href="https://github.com/BrianMitchL/baeaas">GitHub</a></p>
                </footer>
            </div>
        </body>
        </html>`)
    }
};