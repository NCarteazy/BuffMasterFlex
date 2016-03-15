var fs = require('fs');
var http = require('http');

var port = process.env.PORT || 8080;

var requestListener = function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	var sizeFile = fs.stat(__dirname + '/index.html', function (err, stats) {
		if(err) {
			return console.log(err);
		}
		return stats.size;
	});
	
	var buff = new Buffer(sizeFile);

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
			});
	
        res.end();
	});
};
var server = http.createServer(requestListener);
server.listen(port);

