const { dir } = require("console");
const net = require ("net");
const readline = require ("readline/promises")

//rl, clearLine, moveCursor - we use coz were using the command line as UI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//node:tty module
const clearLine = (dir) => {
  //avoid callback hell
  return new Promise ((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    })
  })
}

const moveCursor = (dx, dy) => {
  return new Promise ((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    })
  })
}

let id;

//connect to the server
const socket = net.createConnection({host: "127.0.0.1", port: 3008}, 
  async () => {
    console.log(`connected to server`)

    //the function for putting the message to server
    const ask = async () => {
      const message =  await rl.question ("Enter a message >")
      await moveCursor (0, -1) //move the cursor one line up
      await clearLine (0)  //clear the current line cursor is in
      socket.write (`${id}-message-${message} `)
    }

    ask();

    //the actual implementation of data going to server
    socket.on ('data', async (data) => {
      console.log() //logs an empty line
      await moveCursor (0, -1)
      await clearLine (0)
         //getting an id
          if (data.toString("utf-8").substring(0, 2) === "id") {
            id = data.toString("utf-8").substring(3); //grab everything after that 3rd character
            console.log(`Your id is ${id}!\n`)
          } else {
          //getting a msg

            console.log(data.toString ('utf-8'))
          }

      ask ()
    })
}) 


socket.on ('end', () => {
  console.log(`Connection was ended`)
})

//different clients can connect to the server