var fs = require('fs');
const net = require('net');
const execSync = require("child_process").execSync;
const mdsService = require("../services/mds.service");

// Returns a Buffer object with the raw bytes of a jpg image of a fingerprint.
// run pip install pillow beforehand
const extractImage = (bioValue) => {
    binary = Buffer.from(bioValue, "base64");
    jp2ImageData = binary.slice(binary.indexOf(Buffer.from([0x00,0x00,0x00,0x0C,0x6A,0x50,0x20,0x20,0x0D,0x0A,0x87,0x0A])));
    fs.writeFileSync(`./helpers/finger.jp2`, jp2ImageData);
    const result = execSync("python helpers/imageConverter.py");
    console.log(result.toString("utf8"));
    let imageBuffer = fs.readFileSync(`./helpers/finger.jpg`);
    // let filePathName = `./helpers/${name}.jpg`;
    // fs.renameSync('./helpers/finger.jpg', filePathName);
    fs.unlinkSync(`./helpers/finger.jp2`);
    fs.unlinkSync(`./helpers/finger.jpg`);

    return imageBuffer;
}

//checks the ports for the device from 4500 to 4510
const checkPort = async () => {

    let device;
    let testBody = {
        "type": "Biometric Device"
    }

    for(let port = 4500; port <= 4510; port++){

        try {

            device = await mdsService.findDevice(testBody, port);

            if (device.data[0].deviceStatus === "Ready") {

                console.log("Connected port " + port);
                return {error: {errorCode: '0', errorInfo: "Success"}, port: port};
            }
            else{
                console.log(port + ":Port not Connected");
            }
        } 
        catch (error) {
            console.log(error.message);
        }
    }
    return {error: {errorCode: '500', errorInfo: "Device not Connected"}}
}

module.exports = { 
    extractImage,
    checkPort
};