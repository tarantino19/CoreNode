// PROMISES API //

const fs = require("fs/promises");

//.then.catch
// fs.copyFile("filesystem.txt", "destination.txt")
// 	.then(() => console.log("source.txt was copied to destination.txt"))
// 	.catch(() => console.log("The file could not be copied"));

//async await
// (async () => {
// 	try {
// 		await fs.copyFile("filesystem.txt", "copied-text-file.txt");
// 		console.log(
// 			"'\x1b[33m%s\x1b[0m',",
// 			`filesystem.txt has been copied to a new file`
// 		);
// 	} catch (error) {
// 		console.log(error);
// 	}
// })();

//immediately invoke function above

//CALLBACK API//

// const fs = require("fs");

// fs.copyFile("filesystem.txt", "copied-text-file.txt", (error) => {
// 	if (error) console.log(error);
// });

//SYNCHRONOUS API

// const fs = require("fs");
// fs.copyFileSync("filesystem.txt", "copied-file-system.txt");

//PROMISES are still best with more complicated code
