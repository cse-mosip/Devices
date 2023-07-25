var fs = require('fs')
const spawn = require("child_process").spawn;

// Returns a Buffer object with the raw bytes of a jpg image of a fingerprint.
const extractImage = () => {
    binary = fs.readFileSync('./helpers/data.bin', null)
    jp2ImageData = binary.slice(binary.indexOf(Buffer.from([0x00,0x00,0x00,0x0C,0x6A,0x50,0x20,0x20,0x0D,0x0A,0x87,0x0A])))
    fs.writeFileSync("./helpers/finger.jp2", jp2ImageData)
    
    const pythonProcess = spawn('python',["./helpers/imageConverter.py"]);
    pythonProcess.stdout.on('data', (data) => {
        console.log("Received from python")
        console.log(data.toString())
    });

    jpg = fs.readFileSync('./helpers/finger.jpg', null)

    fs.unlinkSync("./helpers/finger.jp2")
    fs.unlinkSync("./helpers/finger.jpg")

    return jpg
}

module.exports = {extractImage};