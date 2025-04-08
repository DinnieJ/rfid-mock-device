const { io } = require("socket.io-client");
const { v4: uuidv4 } = require('uuid');
const readline = require("readline")

const id = uuidv4();
var roomId = null
console.log("Generated mock device UUID:", id);

const socket = io("http://rfid-socket-server.anf-technology.com:8080", {
    timeout: 500,
    transports: ["websocket"],
    // autoConnect: false
});

function prompt(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    return new Promise((resolve) =>
      rl.question(question, (answer) => {
        // rl.close();
        resolve(answer);
      })
    );
  }

const dataPrompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Tag Data > ",
});

socket.on("connect", () => {
    // Send a message to the server
    socket.emit("scanner:connect",`mock-device-${id}`);
    prompt("Enter the OTP code: ").then((otp) => {
        console.log(otp)
        socket.emit("scanner:joinSession", otp);
    });
});

socket.on("response", (data) => {
    console.log(data)
})

socket.on("clientScanner:sessionJoined", (data) => {
    console.log("Joined session:", data);
    roomId = data
    dataPrompt.prompt()
    dataPrompt.on("line", (line) => {
        socket.emit("scanner:sendTag", line, roomId)
        dataPrompt.prompt()
    });
})
socket.on("connect_error", (err) => {
    console.error("❌ Connection failed:", err.message);
});
socket.on("disconnect", () => {
    console.log("Disconnected from server");
})

// socket.connect();
