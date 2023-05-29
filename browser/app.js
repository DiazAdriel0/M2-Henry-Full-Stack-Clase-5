//(function () {
//let whiteboard = window.whiteboard;
//const whiteboard = require("./whiteboard")
import { whiteboard } from "./whiteboard";
import io from "socket.io-client"
let socket = window.io(window.location.origin);

socket.on("connect", function () {
  console.log("Connected!");
});

socket.on("load", function (strokes) {
  strokes.forEach(function (stroke) {
    let start = stroke.start;
    let end = stroke.end;
    let color = stroke.color;
    whiteboard.draw(start, end, color, false);
  });
});

socket.on("draw", function (start, end, color) {
  whiteboard.draw(start, end, color, false);
});

whiteboard.on("draw", function (start, end, color) {
  socket.emit("draw", start, end, color);
});
//})();

