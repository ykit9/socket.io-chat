/**
 * Created by kit on 31.05.2017.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(user,msg){
        var message = (new Date()).toTimeString().slice(0,8) +' : ' + user+' : ' + msg;
        io.emit('new_message',message);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});



http.listen(3000, function(){
    console.log('listening on *:3000');
});
