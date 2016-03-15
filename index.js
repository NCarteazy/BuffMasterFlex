var fs = require('fs')
var http = require('http')

fs.readFile(__dirname + '/index.html', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	console.log(data);
});

var port = process.env.PORT || 8080

var requestListener = function (req, res) {
	res.writeHead(200);
	fs.readFile(__dirname + '/index.html', 'utf8', function (err, data) {
        if (err) {
                return console.log(err);
        }
        res.write(data);
});

	res.end();
}

var server = http.createServer(requestListener);
server.listen(port);

