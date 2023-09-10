const { Transform } = require("node:stream");
const fs = require("node:fs/promises");

class Encrypt extends Transform {
  _transform (chunk, encoding, callback) {
    // console.log(chunk.toString ('utf-8'))
    //   this.push (chunk)  //transform.prototype from the documentation

    //encrypting
    for (let i = 0; i < chunk.length; ++i) {
      if (chunk[i] !== 255) {
        chunk[i] = chunk[i] + 1;
      }
    }
       callback(null, chunk);
       //or this.push (chunk) to push the data
  }
}

(async () => {

  const readFileHandle = await fs.open("read.txt", "r");
  const writeFileHandle = await fs.open("write.txt", "w");

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  const encrypt = new Encrypt()
  
  readStream.pipe(encrypt).pipe(writeStream)

})()