//streams note is here

// const fs = require("fs/promises");

// // opening a file example async await //dont forget to use AWAIT in the results promise
// // writeMany: 5.396s-6.110s
// // note: use await whenever it returns a promise
// // uses 100% of the cpu - 50mb
// (async () => {
// 	console.time("writeMany");
// 	const fileHandle = await fs.open("test.txt", "w");
// 	for (let i = 0; i < 1000001; i++) {
// 		await fileHandle.write(` ${i} `);
// 	}
// 	console.timeEnd("writeMany");
// })();


//synchronous 
//1.783s but bigger cpu memory use
//callback version
//fd is file descriptor which is just a number
// const fs = require("node:fs");

// (async () => {
//   console.time("writeMany");
//   fs.open("test.txt", "w", (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       const buff = Buffer.from(` ${i} `, "utf-8");
//       fs.writeSync(fd, buff);
//     }
//     console.timeEnd("writeMany");
//   });
// })();


//streams sample intro
//251ms
//CPU MEMORY USAGE - 200mb
//THIS CODE HERE IS NOT A GOOD PRACTICE - DON'T DO IT THIS WAY
//WHY? - fast but very LARGE MEMORY USAGE - not for production

// const fs = require("fs/promises");

// (async () => {
// 	console.time("writeMany");
// 	const fileHandle = await fs.open("test.txt", "w");
//   const stream = fileHandle.createWriteStream()
// 	for (let i = 0; i < 1000001; i++) {
//     const buff = Buffer.from(` ${i} `);   //buffer.from creates a new buffer
//     stream.write(buff)
// 	}
// 	console.timeEnd("writeMany");
// })();


//FIXING THE MEMORY PROBLEM
const fs = require("fs/promises");

(async () => {
	console.time("writeMany");

	const fileHandle = await fs.open("test.txt", "w");
  const stream = fileHandle.createWriteStream()
  console.log(stream.writableHighWaterMark) //16384

  //8 bits = 1 byte 
  //each bit is 1 or 0
  // 1000 bytes = 1 kilobyte
  // 10000kilobytes = 1mb

  // const buff = Buffer.alloc(16383, 'a')
  // console.log(stream.write(buff)) //true
  // console.log(stream.write(Buffer.alloc (1, 'a'))) //false
  //if this returns false, it's time to drain

  //stream.writableLength should not exist the highwatermark value 
  //or we'll have memory issues

  // stream.on ('drain', () => {
  //   console.log(stream.write(Buffer.alloc (1, 'a'))) 
  //   console.log(stream.writableLength)
  //   console.log(`we are now safe to write more`)
  // })

  // setInterval(() => {
    
  // }, 1000);

//if it's true - its safe to write more
  let i = 0;

  const numberOfWrites = 1000000

  //checking if buffer is full
  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, 'utf-8')

      //last write
      if (i === numberOfWrites - 1) {
        return stream.end(buff)
      }

      //if stream.write returns false, stop the loop
      if (!stream.write (buff)) break;
      i++;
    }
  };

  writeMany()

  //resume loop once internal buffer is empty
  stream.on ('drain', () => {
    console.log('drained!') //481 times
    writeMany ()
  })

  stream.on ('finish', () => {
    console.timeEnd("writeMany");
    fileHandle.close()
  })

	// for (let i = 0; i < 1000001; i++) {
  //   const buff = Buffer.from(` ${i} `);   //buffer.from creates a new buffer
  //   stream.write(buff) //this is back pressuring, we keep writing without draining
	// }
  // fileHandle.close()
})();

//it's as fast, but memory usage is 4x smaller





















