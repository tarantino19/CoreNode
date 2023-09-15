const net = require ("net");

const socket = net.createConnection({host: "127.0.0.1", port: 3099}, 
() => {
  // socket.write ("A simple message coming from a simple sender!")
  // console.log(`simple messaged sent`)
      //this can be anything, doesnt have to be a string

  const buff = Buffer.alloc(8);
  buff[0] = 12;
  buff[1] = 34;

  socket.write(buff);
})

