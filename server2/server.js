const express = require('express');
const cors = require('cors');
const http = require("http")
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
require('dotenv').config();
const port = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHAT SECTION

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  },
});


io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.room);
  })

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);

  });

  socket.on("disconnect", () => {
  })
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
  console.log("server running on port:", port);
});




