var express = require('express')
var app = express()
var fs = require('fs')

app.use(express.static(__dirname + '/public'))

app.get('/', function(requres, response) {
fs.readFileSync(__dirname + '/index.html')
})

var port = process.env.PORT || 8080

app.listen(port, function() {
        console.log("Node app is running at:" + port)
})


