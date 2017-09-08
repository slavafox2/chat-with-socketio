"use strick";

var http = require("http"), 
	express = require("express"),
	socketIo = require("socket.io");
 
const app = express();
app.set("view engine", "jade");

// use is create middleware
// app.use((request, response, next) => {
// 	console.log("In iddleware 1");
// 	next();
// 	console.log("Out of middleware 1");
// });

app.use(express.static("./public"));

// app.use((request, response, next) => {
// 	console.log("---In iddleware 2");
// 	next();
// 	console.log("---Out of middleware 2");
// });

app.get("/", (request, response) =>{
	response.end("Hello world!!!");
	console.log("In HANDLER");
});

app.get("/home", (request, response) => {
	response.render("index", {title: "TITLE!"});
});
  
//create SERVER object
const server = new http.Server(app);
const io = socketIo(server);

io.on("connection", (socket) => {
	console.log("connection CLient");
	socket.on("chat:add", data =>{
		console.log(data);
		
		io.emit("chat:added", data);
		
	});

	// socket.on("disconnect", () =>{
	// 	console.log("Socket disconnected");
	// });
});


const port = 3000;
server.listen(port, () => {
	console.log("server started on port " + port);	
});