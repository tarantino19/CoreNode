const net = require ("net");

const server = net.createServer ((socket) => {
  socket.on ('data', (data) => {
    console.log(data)
    // console.log(data.toString ('utf-8')) 
    //this can be anything, doesnt have to be a string

    //buffer received
// <Buffer 0c 22 00 00 00 00 00 00>
  })
})

server.listen (3099, "127.0.0.1", () => {
  console.log(`opened server on`, server.address())
})


