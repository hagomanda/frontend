import io from "socket.io-client";
export const socket = io.connect(process.env.REACT_APP_SERVER_URL, {
  cors: { origin: process.env.REACT_APP_SERVER_URL },
});

export const socketAction = {
  joinMandal: id => {
    socket.emit("joinMandal", id);
  },
  editContent: (content, role, id) => {
    socket.emit("edit", content, role, id);
  },
  leaveMandal: () => {
    socket.emit("leaveMandal");
  },
  modifyMandal: (mandal, mainGoalId) => {
    socket.emit("edit", mandal, mainGoalId);
  },
  selectMandalBox: (user, boxId) => {
    socket.emit("selectMandalBox", user, boxId);
  },
  takeMessage: saveMessage => {
    socket.on("message", (message, createdAt, displayName, profile) => {
      console.log("11111소켓 리시브", message);
      saveMessage(message, createdAt, displayName, profile);
    });
  },
  sendMessage: (message, createdAt, user) => {
    socket.emit("message", message, createdAt, user);
  },
};
