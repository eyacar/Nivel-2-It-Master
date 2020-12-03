var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    //socket.broadcast.emit('chat message', msg);
    io.emit('chat message', msg);
  });
});

http.listen(8080, function(){
  console.log('Conectado al puerto: 8080');
});