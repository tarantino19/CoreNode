// const { Buffer } = require("buffer"); nodejs reco to do this
//Buffer = use to temporarily hold a fixed length sequence of bytes
//8bytes
// bunch of boxes = 1 byte = 8 bits
// hexadecimal
const buff = Buffer.alloc(8);

buff.write("hells", "utf-8");
//take this string, encode it, get the byte and write them to our buffer
//each letter is 1 byte - 8 bits - in utf-8 encoding form
//if u try to write more than it length, those extra chars wont work

console.log(buff);
// console.log(buff.toJSON());
//kind like an array w/ fix length
//js is not good w/ raw binary data
//js is good tho for unicode encoded strings

//in js  String.fromCharCode ('s') // it will show in the log
// es6 introduced typed arrays - ka match ng buffers sa nodejs

// const buff2 = Buffer.from("string", "utf-8");
// //take the string and automatically find out how mant byte it needs using this(utf-8) encoding and write that on that specificed buffer.

// console.log(buff2); //utf   73 74 72 69 6e 67
// console.log(buff2.toJSON()); //hexa [ 115, 116, 114, 105, 110, 103 ]

// console.log(buff2.length); //6

const buff3 = Buffer.from([115, 116, 114, 105, 110, 103], "hex");
// 0-255 in value
//each on is 1 byte
console.log(buff3.toString("utf-8"));
//string
console.log(buff3.toString("utf-16le"));
//瑳楲杮 - chinese characters
//buffers for encoding decoding urls
console.log(buff3.toJSON());
// { type: 'Buffer', data: [ 115, 116, 114, 105, 110, 103 ] }
console.log(buff3.values);
