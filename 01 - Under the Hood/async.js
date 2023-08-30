// console.log(`A`);
// setTimeout(() => {
// 	console.log(`B`);
// }, 0);
// console.log(`C`);
// console.log(`D`);
// console.log(`E`);
// console.log(`F`);

//A
// C
// D
// E
// F
// B//
// process.nextTick - same result - run something after the main execution is done

// SETINTERVAL repeats till x amount of times
//if we have something in the event loop, nodejs will keep on running

// V8 and event loop runs on the same thread.

// e.g. pdf viewer
// we search for something, we can only do that one thing - because single thread. we can fix this by running different theads.because

// libuv has threadpool - 4 by default - this has the filesystem and stuff

//nodejs minimization is what allows node to scale
//what not to do to block the main thread/threadpool?

//e.g. what not to do

setTimeout(() => {
	console.log(`done`);
}, 50);
//this will push an event to the event stack

for (let i = 0; i < 90000000000; i++) {}
//this will take a dang good while
//this is a blocking code, its being occupied by the for loop

// https://nodejs.org/en/docs/guides/dont-block-the-event-loop
