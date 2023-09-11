const http = require ("http");

const port = 4080;
const hostname = "127.0.0.1"     //we can change the routers ip, then other devices can connect to it. But they have to be at the same network.

const server = http.createServer ((req, res) => {
  const data = {message: "Hi there!"}

  res.setHeader ('Content-Type', 'application/json');
  res.setHeader ('Connection', 'close');
  res.statusCode = 200;
  res.end (JSON.stringify (data));

})

server.listen (port, hostname,  () => {
  console.log(`Server running at http://${hostname}:${port}`); 
})