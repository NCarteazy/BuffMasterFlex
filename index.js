var express = require('express')
var app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', function(requres, response) {
response.sendfile(__dirname + '/index.html')
})

var port = process.env.PORT || 8080

app.listen(port, function() {
	console.log("Node app is running at:" + port)
})

