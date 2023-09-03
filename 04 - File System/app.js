const fs = require("fs/promises");

(async () => {

		//easy file name access

		const CREATE_FILE = "create a file";
		const DELETE_FILE = "delete the file";
		const RENAME_FILE = "rename the file";
		const ADD_TO_FILE = "add to the file";
		// const APPEND_TO_FILE = "append to the file";
			
	//create file function
	 const createFile = async (path) => {
			try {
			//check if we already have that file
				const existingFileHandle = await fs.open(path, 'r')
				existingFileHandle.close()
				return console.log(`This file ${path} already exist`)
			} catch (error) {
			//we don't have the file now we should create it
				//flag is w as write  //FILE SYSTEM FLAGS
				const newFileHandle = await fs.open(path, 'w')
				console.log(`a new file was successfully created`)
				await newFileHandle.close()
			}
	 };

	 const deleteFile = async (path) => {
		try {
			await fs.unlink (path)
				console.log(`deleting ${path}`)
		} catch (error) {
			if (error.code === "ENOENT"){
				console.log(`no file at this file to remove`)
			} else {
				console.log(`an error occurred while removing the file`)
				console.log(error)
			}
		}
	 };

	 const renameFile = async (oldPath, newPath) => {
		try {
			await fs.rename(oldPath, newPath)
			console.log(`renaming ${oldPath} to ${newPath}`)
		} catch (error) {
			if (error.code === 'ENOENT') {
				console.log("No file at this path to rename, or the destination doesn't exist.")
			} else {
				console.log(`An error ocurred while renaming the file`)
				console.log(error)
			}
		}
	 };
	
	 let addedContent; 

	 const addToFile = async (path, content) => {
		 if (addedContent === content) return; //we just added this coz of that buggy fs api
		 try {
			 const fileHandle = await fs.open(path, "a");
			 //a is for append/ or adding, w is for replacing the whole thing
			 //we can also use the fs.appendFile - we dont need to open the file first
			 fileHandle.write(content);
			 addedContent = content;
			 console.log("The content was added successfully.");
			 fileHandle.close()
		 } catch (e) {
			 console.log("An error occurred while removing the file: ");
			 console.log(e);
		 }
	 };

	 //this worked too
	//  const addToFile = async (path, content) => {
	// 	try {
	//    const fileHandle = await fs.open (path, 'a')
	// 		fileHandle.write(content)
	// 		fileHandle.close()
	// 		console.log(`adding ${content} to ${path}`)
	// 	} catch (error) {
	// 		console.log(`You weren't successful in adding the new content`)
	// 	}
	//  };

	//  const appendToFile = async (path, content) => {
	// 	try {
	// 		await fs.appendFile (path, content)
	// 		console.log(`adding this new content: ${content} to ${path}`)
	// 	} catch (error) {
	// 		console.log(`You weren't successful in adding the new content`)
	// 	}
	//  };


	const commandFileHandler = await fs.open ('./command.txt', 'r') //opening the file
	
	//EventEmitter - all computation
	commandFileHandler.on ('change', async () => {
//get size of our file
			const size = (await commandFileHandler.stat()).size
			//allocate our buffer with size of file
			const buff = Buffer.alloc(size)
			//offset location at which we want to start filling our buffer -> 0
			const offset = 0
			//how many bytes we want to read
			const length = buff.byteLength
			//position we want to start reading the file from whenever we run the app
			//we always want to read from beginning to end - so we start w/ zero
			const position = 0  
			await commandFileHandler.read(buff, offset, length, position); //no need to save-unless needed

			const command = buff.toString('utf-8')
			console.log(command)

			//create a file
			//create a file <path>
			if (command.includes (CREATE_FILE)){
				const filePath = command.substring (CREATE_FILE.length + 1)
				createFile (filePath)
			}

			//delete a file
			//delete the file <path>
			if (command.includes (DELETE_FILE)) {
				const filePath = command.substring (DELETE_FILE.length + 1)
				deleteFile (filePath)
			}

			//rename a file
			//rename the file <oldPath> to <newPath>
			if (command.includes (RENAME_FILE)) {
				const _index = command.indexOf (" to ")
				const oldFilePath = command.substring (RENAME_FILE.length + 1, _index)
				const newFilePath = command.substring (_index + 4) //plus 4 because of " to "
				renameFile (oldFilePath, newFilePath)
			}	

			//adding content to file
			//add content to the file <path> this content: <content>
			if (command.includes (ADD_TO_FILE)){
				const _index = command.indexOf (" this content: ")
				const filePath = command.substring (ADD_TO_FILE.length + 1, _index)
				const content = command.substring (_index + 15)
				addToFile (filePath, content + " ")
			}

			// if (command.includes (APPEND_TO_FILE)){
			// 	const _index = command.indexOf (" this content: ")
			// 	const filePath = command.substring (APPEND_TO_FILE.length + 1, _index)
			// 	const content = command.substring (_index + 15)
			// 	appendToFile (filePath, content + " ")
			// }


	})

		//decoder - 01s => something meaningful like strings
		//encoder - strings/something meaningful => 01s

	//watcher
	const watcher = fs.watch("./command.txt");  //can watch a directory or a file name
	for await (const event of watcher) {
		if (event.eventType === 'change') {
			commandFileHandler.emit ("change") 
			//ust an event emitter function passed here to make code cleaner
		}
	}
})();


//when you open a file, you also need to close it .open .close






//https://github.com/agile8118/node-file-handler/blob/main/app.js






