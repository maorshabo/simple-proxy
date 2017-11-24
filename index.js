var proxy = require('express-request-proxy');
var url = require('url');
var app = require('express')();

let maorshabo = {};

app.use(function(req,res,next) {
    res.setHeader('Access-Control-Expose-Headers', 'x-total,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('*', function(req,res, next) {
    const b = url.parse(req.url.substring(1, req.url.length), true);
    maorshabo.target = req.url.substring(1, req.url.indexOf('?'));
    maorshabo.query = b.query;

    app.use(proxy({
        url: 'http://' + maorshabo.target,
        query: maorshabo.query,
        cache: false
    }));

    next();
});



app.listen(1337, function(e) {
    console.log('Example app listening on port 1337');
});