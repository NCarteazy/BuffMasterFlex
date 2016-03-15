var fs = require('fs')
var http = require('http')

var port = process.env.PORT || 8080

var requestListener = function (req, res) {
	fs.readFile(__dirname + '/index.html', 'utf8', function (err, data) {
        if (err) {
                return console.log(err);
        }
});
	
	res.end();
}

var server = http.createServer(requestListener);
server.listen(port);

