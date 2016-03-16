var fs = require('fs');
var http = require('http');

var port = process.env.PORT || 8080;

var requestListener = function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});

	var buff = new Buffer(512);
	
	fs.open(__dirname + '/index.html', 'r',  function (err, fd) {
         	if (err) {
                	return console.log(err);
        	}
		fs.fstat(fd, function (err, stats) { 
			var size = stats.size;
			var loca = 0;
			console.log( "Size of file: " + size);
			for (loca = 0; loca < size; ) {
				loca = loca + buff.length;
				fs.read(fd, buff, 0, buff.length, loca, function( err, bytesRead, buffer) {
					res.write(buffer.toString('utf8', 0, bytesRead));	
				});
			}
		}); 
		res.end();
		fs.close(fd); 
	});
};
var server = http.createServer(requestListener);
server.listen(port);

