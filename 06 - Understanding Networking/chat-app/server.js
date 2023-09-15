const net = require ("net");

const PORT = 4020;
const HOST = "127.0.0.1";  //CHANGE TO IP PROVIDED BY SERVER PROVIDER

const server = net.createServer()  //creates a server

//an array of client sockets
const clients = []

server.on ('connection', (socket) => {
    console.log(`A new connection the server`)
    const clientId = clients.length + 1;

      //broadcasting to everyone when x client enters the chatroom
    clients.map ((client) => {
        client.socket.write (`User ${clientId} joined`)
    })

    socket.write (`id-${clientId}`) //assigning an id for a client and we're sending it back to them 
    //it's available on

        //were putting the data to all clients here
    socket.on ('data', (data) => {
        const dataString = data.toString ("utf-8")
        const id = dataString.substring (0, data.indexOf("-"))
        const message = dataString.substring (dataString.indexOf("-message-") + 9)
        //writing data per socket here
        clients.map ((client) => {
            client.socket.write (`>User ${id}: ${message}`)
        });
        // console.log(data.toString('utf-8')) 
        //we want to send this message to every single client so they can see it
        //so what do we do?
        //socket is a duplex stream, we can read and write
    });

    //broadcasting to everyone when x client leaves the chatroom
    socket.on ('end', () => {
        clients.map ((client) => {
            client.socket.write (`>User ${clientId} left`)
        });
    })

    clients.push ({id: clientId.toString(), socket: socket});
})

//socket - 2 endpoints talking together

server.listen (PORT, HOST, () => {
    console.log(`Opened server on`, server.address ())
})

//run server.js first

