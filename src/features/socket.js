const { io } = require("socket.io-client");
export const socket = io.connect("http://localhost:8000");

export const socketAction = {
  joinMandal: id => {
    socket.emit("joinMandal", id);
  },
  editContent: (content, role, id) => {
    socket.emit("edit", content, role, id);
  },
};
