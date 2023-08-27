//Creating a simple web server

const http = require("http");
//listen to ports, send & receive http request
const fs = require("fs/promises");
//read and write files, be used as promise (async await syntax)
const PORT = 8000;
const server = http.createServer(async (req, res) => {
	const contentBuffer = await fs.readFile(__dirname + "/prereq.txt");
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end(contentBuffer.toString("utf-8"));
});

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
