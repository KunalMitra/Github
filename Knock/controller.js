//	Knock : A Chat Application based on Node.Js & Socket.io with Foundation5 integration.
// 	Build 1.0.0

/**
* 
* Knock by Mitra K.
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*
*/

//	Configure initial port number. Here it is configured to 15665
var KnockPort = 15665;

// Packages

var knock = require('express'), app = knock();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var jade = require('jade');

// Views Options

app.set('views', __dirname + '/front'); 			// Directory name set to front.
app.set('view engine', 'jade');
app.set("view options", { layout: false }) 			// Default Single page template is disabled.

app.configure(function() {
	app.use(knock.static(__dirname + '/data')); 	// Default directory name set to data.
});

// Chat page powered using jade. 

app.get('/', function(req, res){
  res.render('index.jade');
});


server.listen(KnockPort);

//Chat Connection using Socket.io

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 			// Some browsers might not have websockets. xhr-polling works cross browsers.
  io.set("polling duration", 5); 
});


io.sockets.on('connection', function (socket) {
	socket.on('Pseudo_Set', function (data) {		//Set the Name/Pseudo
		socket.set('pseudo', data);
	});

	socket.on('message', function (message) {
		socket.get('pseudo', function (error, name) {
			var data = { 'message' : message, pseudo : name };
			socket.broadcast.emit('message', data);					 //Broadcast the Message to all users
			console.log("user " + name + " send this : " + message); // Console registers the messages
		})
	});
});