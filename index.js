var fs = require('fs')
var http = require('http')


fs.readFile(__dirname + '/index.html', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	console.log(data);
});

var port = process.env.PORT || 8080

var requrestListener = function (req, res) {
	res.writeHead(200);
	res.end('Hola\n');
}

var server = http.createServer(requrestListener);
server.listen(port);

