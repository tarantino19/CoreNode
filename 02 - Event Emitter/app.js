const EventEmitter = require("./events");

// or straight from node
// const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on("foo", () => {
	console.log(`An event occurred 1`);
});

myE.on("foo", () => {
	console.log(`An event occurred 2`);
});

myE.on("foo", (x) => {
	console.log(`An event with a parameter occurred: ${x}`);
});
//x.ON - to respond to an event
//were pushing the function inside of the object
//pushing new function to the objects

myE.on("bar", () => {
	console.log(`An event occurred bar`);
});

myE.once("once", () => {
	console.log(`An event occurred once 1`);
});

myE.emit("foo");
myE.emit("foo", "some text 1");
myE.emit("foo", "some text 2");
//will run two times, 1st without parameter, next w param
//on and emit isn't async
//when we emit it,the emitter will loop through everything it has and it will run the functions associated with that object
myE.emit("bar");
myE.emit("bar");
myE.emit("once");
myE.emit("once");
myE.emit("once");
myE.emit("once");
myE.emit("once");

//object.once  - like on - but we only run it once - we can only emit once
