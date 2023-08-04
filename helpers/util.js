var fs = require('fs');
const net = require('net');
const execSync = require("child_process").execSync;

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

const checkPortsInRange = async (startPort, endPort) => {
    const usedPorts = [];

    for (let port = startPort; port <= endPort; port++){
        const server = net.createServer();
        console.log("checking for port " + port);

        try{
            await new Promise((resolve, reject) => {
                server.once('error', (err) => {
                    if (err.code === 'EADDRINUSE'){
                        usedPorts.push(port);
                    }
                    console.log("port " + port + " is not in use");
                    resolve();
                });

                server.listen(port, '127.0.0.1', () => {
                    server.close();
                    resolve();
                });
            });
        }catch (err){
            consolee.log(err.message);
        }

        return usedPorts;
    }
}

module.exports = { 
    extractImage,
    checkPortsInRange
};