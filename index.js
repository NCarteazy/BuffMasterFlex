var fs = require('fs');
var http = require('http');

var port = process.env.PORT || 8080;

var requestListener = function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});

	var size = fs.stat(__dirname + '/index.html', function (err, stats) {
		if (err) {
			console.log(err);
		}
		return stats.size;
	});
	var local = 0;
	
	var buff = new Buffer(512);
	
	fs.open(__dirname + '/index.html', 'r',  function (err, fd) {
         	if (err) {
                	return console.log(err);
        	}
        	if (local <= size - 512) {
		fs.read(fd, buff, local, 512, local, function (err, bytesRead, buffer) {
		 	if (err) {
				return console.log(err);
			}
			console.log(buff.toString('utf8'));
			local = local + 512;
		});}
		else {
		var diff = size - local;
		fs.read(fd, buff, local, diff, local, function (err, bytesRead, buffer) {
			if (err) {
				return console.log(err);
			}
			res.write(buff);
		 
		});
		}
	});
res.end();
};
var server = http.createServer(requestListener);
server.listen(port);

