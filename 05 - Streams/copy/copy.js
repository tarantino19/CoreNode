const fs = require ("fs/promises"); //dont forget the semi colon
const { pipeline } = require("node:stream/promises");

//SOLUTION #3 - USING STREAMS - PIPE/PIPELINE
//File Size - 989MB
//Execution Time = 1s
//memory usage 20mb
(async () => {
  console.time('copy');

  //step 1 - Open the files I want to use
  const srcFile = await fs.open("text-small.txt", "r");
  const destFile = await fs.open("text-copy.txt", "w");

  //step 2 - create and write stream
  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

    //*****PIPING SOLUTION*****
  // Don't use pipe in production, use pipeline instead! It will automatically
  // handle the cleanings for you and give you an easy way for error handling
  //1.2s- 700ms

  //STEP 3 
  //promise method - named function

  const copyStreamPipeline = async (err) => {
    await pipeline(readStream, writeStream);
    console.log(err);
    console.timeEnd("copy");
  }
  copyStreamPipeline()


  //anon async function way
  // (async () => {
  //   await pipeline(readStream, writeStream);
  //   console.log(err);
  //   console.timeEnd("copy");
  // })()

    //callback method
  // pipeline(readStream, writeStream, (err) => {
  //   console.log(err);
  //   console.timeEnd("copy");
  // });


  //*****PIPING SOLUTION*****

  // READSTREAM
    // readStream.on ('data', (chunk) => {
  //   console.log(chunk.toString ('utf-8')) //1-999999
  // }) -to read an cl the content

  ///// ANOTHER SOLUTION
  //step 3 - use piping - for draining - handling backpressure, resuming and pausing
  // readStream.pipe(writeStream); //destination has to be a writable/duplex/transform - can do chaining .pipe(writableStream) - but it has to be duplex or transform - before .pipe has to be a readable stream

    // readStream.on("end", () => {
  //   console.timeEnd("copy");
  // });

  //// ANOTHER E SOLUTION

    // console.log(readStream.readableFlowing);

  // readStream.pipe(writeStream);

  // console.log(readStream.readableFlowing);

  // readStream.unpipe(writeStream);

  // console.log(readStream.readableFlowing);

  // readStream.pipe(writeStream);

  // console.log(readStream.readableFlowing);

 // console.timeEnd("copy"); //not accurate without the streamread.on end
})()

//don't use pipe in production

//THE KEY GOAL OF STREAM PIPING IS SO WE DONT OVERLOAD OUR MEMORY

//stream.finished for handling errors






//COPYING FILES
//1st solution
//not the best one but okay on small files
// (async () => {
//   console.time('copy');
//   const destFile = await fs.open ("text-copy.txt", "w")
//   const result = await fs.readFile ("test.txt")

//   await destFile.write(result)
//use await wen were expecting a RESULT, a promise, some kind of response

//   console.timeEnd('copy');
// })()

  //not practical to do this on large files

  //use streams instead



//2nd solution via our own streams - without using an actual stream

// const { read } = require("fs");
// const fs = require ("fs/promises"); //dont forget the semi colon

// (async () => {
//   console.time('copy');
  
//   const srcFile = await fs.open ('text-small.txt', 'r') //opening the file
//   const destFile = await fs.open ('text-copy.txt', 'w') //opening the file

//   let bytesRead = -1;

//   while (bytesRead !== 0){
//     const readResult = await srcFile.read() //reading the srcfile
//     bytesRead = readResult.bytesRead  //bytes read number

//     //fix the buffer null zeroes in the result .. 3:20 in the video
//     if (bytesRead !== readResult.buffer.length) {
//   // we have some null bytes, remove them at the end of the returned buffer
//   // and then write to our file
//       const indexOfNotFilled = readResult.buffer.indexOf(0)
//       const newBuffer = Buffer.alloc(indexOfNotFilled);
//       readResult.buffer.copy (newBuffer, 0, 0, indexOfNotFilled)
//       destFile.write (newBuffer)
//     } else {
//       destFile.write(readResult.buffer) //writing the readresult to the text-copy(destFile) file
//     }
//   }

//   console.timeEnd('copy');
// })()



// ----- from vid
// File Size Copied: 1 GB
// Memory Usage: 1 GB
// Execution Time: 900 ms
// Maximum File Size Able to Copy: 2 GB
// (async () => {
//   console.time("copy");
//   const destFile = await fs.open("text-copy.txt", "w");
//   const result = await fs.readFile("text-big.txt");

//   await destFile.write(result);

//   console.timeEnd("copy");
// })();

// File Size Copied: 1 GB
// Memory Usage: 30 MB
// Execution Time: 2 s
// Maximum File Size Able to Copy: No Limit
// (async () => {
//   console.time("copy");

//   const srcFile = await fs.open("text-gigantic.txt", "r");
//   const destFile = await fs.open("text-copy.txt", "w");

//   let bytesRead = -1;

//   while (bytesRead !== 0) {
//     const readResult = await srcFile.read();
//     bytesRead = readResult.bytesRead;

//     if (bytesRead !== readResult.buffer.length) {
//       // we have some null bytes, remove them at the end of the returned buffer
//       // and then write to our file
//       const indexOfNotFilled = readResult.buffer.indexOf(0);
//       const newBuffer = Buffer.alloc(indexOfNotFilled);
//       readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
//       destFile.write(newBuffer);
//     } else {
//       destFile.write(readResult.buffer);
//     }
//   }

//   console.timeEnd("copy");
// })();

// File Size Copied: 1 GB
// Memory Usage: 30 MB
// Execution Time: 1 s
// Maximum File Size Able to Copy: No Limit
// (async () => {
//   console.time("copy");

//   const srcFile = await fs.open("text-big.txt", "r");
//   const destFile = await fs.open("text-copy.txt", "w");

//   const readStream = srcFile.createReadStream();
//   const writeStream = destFile.createWriteStream();

  // console.log(readStream.readableFlowing);

  // readStream.pipe(writeStream);

  // console.log(readStream.readableFlowing);

  // readStream.unpipe(writeStream);

  // console.log(readStream.readableFlowing);

  // readStream.pipe(writeStream);

  // console.log(readStream.readableFlowing);

  // readStream.on("end", () => {
  //   console.timeEnd("copy");
  // });

  // Don't use pipe in production, use pipeline instead! It will automatically
//   // handle the cleanings for you and give you an easy way for error handling
//   pipeline(readStream, writeStream, (err) => {
//     console.log(err);
//     console.timeEnd("copy");
//   });
// })();