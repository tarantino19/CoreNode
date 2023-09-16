const net = require('net');
const fs = require ('node:fs/promises');

const server = net.createServer(() => {}); //creating a server 


	//the socket is the endpoint - it's always available - opening the connection + data (socket)
	server.on('connection', (socket) => {
			console.log(`new connection detected...`)

			//data is the a buffer
					//opening the storage then putting a file name test.txt there - as write as well - fileHandle = then fileStream is the function thats actually writing it
			socket.on ('data', async (data) => {
					const fileHandle = await fs.open ('storage/test.txt', 'w')
					const fileStream = fileHandle.createWriteStream ()   //can also use pipeline
					fileStream.write(data) 	//writing to your destination file
			})
	});


server.listen (5050, "::1", () => {
	console.log(`Upload Server Opened On`, server.address())
})

//listening to server to make sure it's working
