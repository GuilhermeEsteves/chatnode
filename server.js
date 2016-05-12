var express = require("express"),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    
    console.log('a user connected');
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

var port = Number(process.env.PORT || 3000);

http.listen(port, function(){
  console.log('listening on *:3000');
});