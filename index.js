var fs = require('fs');
var http = require('http');

var port = process.env.PORT || 8080;

var requestListener = function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	var buff = new Buffer(4096);

	fs.open(__dirname + '/index.html', 'r',  function (err, fd) {
         	if (err) {
                	return console.log(err);
        	}
        
		fs.read(fd, buff, 0, buff.length, null, function (err, bytesRead, buffer) {
		 	if (err) {
				return console.log(err);
			}
			if (bytesRead > 0) {
				res.write(buff.toString('utf8'));
			}
			if (bytesRead >= fs.stat(__dirname + '/index.html', function (err, stats) {
				return stats.size;
			}))
				console.log("DONE READING");
			});
	
        res.end();
	});
};
var server = http.createServer(requestListener);
server.listen(port);

