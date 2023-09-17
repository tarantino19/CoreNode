const net = require("net");
const fs = require("node:fs/promises");

const server = net.createServer(() => {});

server.on("connection", (socket) => {
  console.log("New connection!");
  let fileHandle, fileWriteStream;

  socket.on("data", async (data) => {
    if (!fileHandle) {
      socket.pause(); // pause receiving data from the client

      const indexOfDivider = data.indexOf("-------");
      const fileName = data.subarray(10, indexOfDivider).toString("utf-8");

      fileHandle = await fs.open(`storage/${fileName}`, "w");
      fileWriteStream = fileHandle.createWriteStream(); // the stream to write to

      // Writing to our destination file, discard the headers
      fileWriteStream.write(data.subarray(indexOfDivider + 7));

      socket.resume(); // resume receiving data from the client
      fileWriteStream.on("drain", () => {
        socket.resume();
      });
    } else {
      if (!fileWriteStream.write(data)) {
        socket.pause();
      }
    }
  });

  // This end event happens when the client.js file ends the socket
  socket.on("end", () => {
    if (fileHandle) fileHandle.close();
    fileHandle = undefined;
    fileWriteStream = undefined;
    console.log("Connection ended!");
  });
});

server.listen(5050, "::1", () => {
  console.log("Uploader server opened on", server.address());
});
 //if this is a chat app, real time notif app, games app -  then we keep the connection open
//listening to server to make sure it's working
//this version is not good for deployment because these are streams and we need to drain it


// https://www.youtube.com/watch?v=GVLw17FNZ3A&list=PLCiGw8i6Nhvo08rQd9J7e19ToKMCJVKaM&ab_channel=Cododev - playlist for corenode