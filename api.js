var express = require('express');
var app = express();
var fs = require("fs");
const { execFile } = require('child_process');


// Definition of resource actions

app.get('/servers', function (req, res) {
  execFile('ls',['./servers'],(err, stdout, stderr) => {
    if (err) {
      return
    }
    console.log(`GET : /servers : `+ new Date())
    res.end( stdout )
  })
})

app.get('/servers/:id', function (req, res) {
  execFile('cat',['./servers/' + req.params.id],(err, stdout, stderr) => {
    if (err) {
      return
    }
    console.log(`GET : /servers/:id : `+ new Date())
    res.end( stdout )
  })
})

app.put('/servers/:id', function (req, res) {
  execFile('touch',['./servers/' + req.params.id],(err, stdout, stderr) => {
    if (err) {
      res.status(404)
      res.end( "failed\n" )
      return
    }
    console.log('PUT:/servers/' + req.params.id + ' ::: ' + new Date())
    res.status(202)
    res.end( "refer : /queue/2314" )
  })
})

app.post('/servers/:id', function (req, res) {
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    data["user4"] = user["user4"];
    console.log('POST : /servers/:id '+ new Date());
    res.end( JSON.stringify(data));
  });
})



// end of definitions


var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
