var fs = require('fs');
var http = require('http');

var port = process.env.PORT || 8080;
var requestListener = function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});

	fs.open(__dirname + '/index.html', 'r',  function (err, fd) {
         	if (err) {
                	return console.log(err);
        	}
		fs.fstat(fd, function (err, stats) { 
			if (err) {
				return console.log(err);
			}
			var bsize = stats.size;
			var csize = 512;
			var buffer = new Buffer(bSize);
			var bread = 0;
			
			while ( bread < bsize ) {
				if ((bread + csize) > bsize) {
					csize = (bsize - bread);
				}
			fs.read(fd, buffer, bread, csize, bread);
			bread = bread + csize;
			}
		console.log(buffer.toString('utf8', 0, bsize));
		res.write(buffer.toString('utf8', 0, bsize));
		res.end();
		fs.close(fd);	
		
		}); 
	});
};
var server = http.createServer(requestListener);
server.listen(port);

