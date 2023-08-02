var fs = require('fs')
const execSync = require("child_process").execSync;

// Returns a Buffer object with the raw bytes of a jpg image of a fingerprint.
// run pip install pillow beforehand
const extractImage = (bioValue, name) => {
    binary = Buffer.from(bioValue, "base64")
    jp2ImageData = binary.slice(binary.indexOf(Buffer.from([0x00,0x00,0x00,0x0C,0x6A,0x50,0x20,0x20,0x0D,0x0A,0x87,0x0A])))
    fs.writeFileSync(`./helpers/finger.jp2`, jp2ImageData)
    const result = execSync("python helpers/imageConverter.py");
    console.log(result.toString("utf8"));
    fs.rename('./helpers/finger.jpg', `./helpers/${name}.jpg`)
    fs.unlinkSync(`./helpers/finger.jp2`)
}

module.exports = {extractImage};