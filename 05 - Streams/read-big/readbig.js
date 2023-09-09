const fs = require("fs/promises");

(async () => {
  console.time("readBig");
  const fileHandleRead = await fs.open ('text-small.txt', 'r')
  const fileHandleWrite = await fs.open ('dest.txt', 'w')

  const streamRead = fileHandleRead.createReadStream({highWaterMark: 64 * 1024}) //64kb - 65 bytes
  const streamWrite = fileHandleWrite.createWriteStream() 

  let split = ""

  streamRead.on ('data', (chunk) => {
    const numbers = chunk.toString('utf-8').split("  ")

    //2:40 in the video
    if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
      if (split) {
        numbers[0] = split.trim() + numbers[0].trim();
      }
    }

    if (Number(numbers[numbers.length - 2]) + 1 !== Number(numbers[numbers.length - 1])){
        split = numbers.pop()
    }

    // console.log(numbers)

    numbers.forEach ((num) => {
      let n = Number(num)
      if (n % 2 === 0){
        if (!streamWrite.write(" " + n + " ")) {
          streamRead.pause();
        } //if streamWrite is full -pause it - this is the function that writes the files 
        //dest text is the result
      }
    })
  });

  //optimized for draining
  streamWrite.on ('drain' , () => {
    streamRead.resume()  //otherwise, do the drain then resume
  })
  //this is low memory usage compared to code without the drain
  //using streams allows us to deal w/ huge amounts of data
  
  streamRead.on ('end', () => {
    console.log(`Done reading`)
    console.timeEnd("readBig");
  })

})();

//.on is an event emitter
// we don't have a stream.end on a readable stream
// its automatically done for us

//some notes on the getting even chunks
// 7.9gb - roughly 63 million bits - 1 byte = 8 bits
//1hex = four zeros (four bits) or 1s
//a buffer is a unit of array, 8 zeros and 1s
//without the if statement, we're not quite getting the right data we needed

//https://www.youtube.com/watch?v=e5E8HHEYRNI&ab_channel=Cododev
//2:30++




