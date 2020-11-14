var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var users = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  users[socket.id] = "";
  socket.on("chat message", payload => {
    users[socket.id] = payload.user;
    io.emit("chat message", payload);
  });
  socket.on("disconnect", () => {
    delete users[socket.id];
  });
});

http.listen(3345, () => {
  console.log("listening on *:3345");
});
