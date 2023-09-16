const net = require('net');
const fs = require ('node:fs/promises');

//connecting to the server w/ createconnection
const socket = net.createConnection ({host: "::1" , port: 5050}, async () => {

  //finding and opening the file path we want to copy
  //then reading and opening that data
    const filePath = "./text.txt"
    const fileHandle = await fs.open (filePath, 'r')
    const fileStream = fileHandle.createReadStream ()


    //reading from the source file - and writing it via socket.write (data)
    fileStream.on ('data', (data) => {
      socket.write (data)
    })

    fileStream.on ('end', () => {
      console.log(`the file was successfully uploaded`)
      socket.end()  //if this is a chat app, then we keep the connection open
    })

})












//check github for this version - comment w/ commit "basic upload"