const net = require('net');
const fs = require ('node:fs/promises');

const server = net.createServer(() => {}); //creating a server 

let fileHandle, fileStream;
	//the socket is the endpoint - it's always available - opening the connection + data (socket)
	server.on('connection', (socket) => {
			console.log(`new connection detected...`)

			//data is the a buffer
					//opening the storage then putting a file name test.txt there - as write as well - fileHandle = then fileStream is the function thats actually writing it
			socket.on ('data', async (data) => {
					fileHandle = await fs.open ('storage/test.txt', 'w')
					fileStream = fileHandle.createWriteStream ()   //can also use pipeline
					fileStream.write(data) 	//writing to your destination file
			})

			socket.on ('end', () => {
				console.log(`connected ended`)
				fileHandle.close();  
			})


	});


server.listen (5050, "::1", () => {
	console.log(`Upload Server Opened On`, server.address())
})
 //if this is a chat app, real time notif app, games app -  then we keep the connection open
//listening to server to make sure it's working
//this version is not good for deployment because these are streams and we need to drain it