var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var device = require('express-device');
var runningPortNumber = process.env.PORT;

app.configure(function () {
    /* Setup access for '/public' directory. */
    app.use(express.static(__dirname + '/public'));
    /* Setup view engine. */
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(device.capture());
});

/* Logs every server request. */
app.use(function (req, res, next) {
    /* Output every server request. */
    console.log({method: req.method, url: req.url, device: req.device});
    /* Go to next function in line. */
    next();
});

/* Setup index route. */
app.get("/", function (req, res) {
    res.render('index', {});
});

/* Setup listener to wait on new incoming connections. */
io.sockets.on('connection', function (socket) {
    /* New Socket connection. */
    console.log('Socket connected with id: ' + socket.id);
    /* Log new connection. */
    io.sockets.emit('log', {id: socket.id, event: "New incoming connection."});

    /* Listen on new events from clients. */
    socket.on('event', function (data, fn) {
        console.log(data);
        /* Log new events. */
        io.sockets.emit('log', {id: socket.id, event: data});
    });

});

/* Tell server to listen on configured port. */
server.listen(runningPortNumber);
