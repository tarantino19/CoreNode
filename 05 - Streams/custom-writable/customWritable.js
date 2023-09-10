const { Writable } = require ("node:stream");
const fs = require("node:fs");

//a method is a function that belongs to a class
//this is a custom write stream - but better to use the one provided by nodejs


//this works not just in files, but also network card, write to anothe process, etc.
class FileWriteStream extends Writable {
  constructor ({highWaterMark, fileName})  {
      super (highWaterMark);

      this.fileName = fileName
      this.fd = null
      this.chunks = []
      this.chunkSize = 0
      this.writesCount = 0
  }

    //this will run after the constructor and it will put off other functions until we call the callback function
    //do not use directly this.write in the construct
  _construct (callback) {
    fs.open (this.fileName, 'w', (err, fd) => {
      if (err) {
        callback(err)
      } else {
        this.fd = fd
        callback()
      }
    })

  }

  _write (chunk,encoding,callback) {
    this.chunks.push (chunk)
    this.chunkSize += chunk.length

    if (this.chunkSize > this.writableHighWaterMark){
      fs.write (this.fd, Buffer.concat(this.chunks), (err) => {
          if (err) {
            return callback (err)
          }
          this.chunks = []
          this.chunkSize = 0
          ++this.writesCount
          callback()
      })
    } else {
      callback()
    }
  }

  _final (callback) {
    fs.write(this.fd, Buffer.concat (this.chunks), (err) => {
      if (err) return callback (err)
      ++this.writesCount
      this.chunks = []
      callback()
    })
  }

  //dont emit dont throw new error, use the callback(err)
  _destroy (error, callback) {
    console.log("Number of writes:", this.writesCount)

    if (this.fd) {
      fs.close (this.fd, (err) => {
        callback (err || error )
      })
    } else {
      callback (error)
    }
  }
}

//this above is pretty much the same as like when we do this below
// const stream = fs.createWriteStream()

(async () => {
	console.time("writeMany");

  const stream = new FileWriteStream ({fileName: 'text.txt'})

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

  let d = 0;

  stream.on ('drain', () => {
    ++d;
    writeMany()
  })

  stream.on ('finish', () => {
    console.log(`Number of drains: ${d}`) //480
    console.timeEnd("writeMany");
  })


})();

// stream.write (Buffer.from ("this some string bruh"))
// stream.end (Buffer.from (' this is the end ser'))
// stream.on ('finish' , () => {
//   console.log(`stream is finished.`)
// })
