var express = require('express');
var app = express();
var fs = require("fs");
const request=require('request');
const { execFile } = require('child_process');

// resource definition
var resource_nodes = ['172.17.0.2', '172.17.0.2'];


// Definition of resource actions

// get list of resources from each known node
app.get('/servers', function (req, res) {               
    var i
    for (i of resource_nodes) {
      console.log(i)
      request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.url);
        console.log(body.explanation);
      });
    }
    console.log(`GET : /servers : `+ new Date())
    res.end( "mkay" )
})



// end of definitions


var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
