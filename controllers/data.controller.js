require("dotenv").config();

const mdsService = require("../services/mds.service");
const utils = require("../helpers/util");

const discover = async (req, res) => {

    let testBody = {
        "type": "Biometric Device"
    }
    // console.log(new Date().toISOString());

    try {
        let device = await mdsService.findDevice(req.body, req.query.port);

        if (device.data[0].deviceStatus === "Ready") {

            res.status(200).json({
                success: true,
                device: device.data[0]
            });
        }
        else {

            res.status(400).json({
                success: false,
                error: 'Device not ready'
            });
        }
    }
    catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const info = async (req, res) => {

    try {

        let portInfo = await utils.checkPort();

        if (portInfo.error.errorCode === '0') {

            let port = portInfo.port;
            let info = await mdsService.deviceInfo(port);
            // console.log(info);

            if (info.error.errorCode === '0') {
                res.status(200).send({
                    deviceInfo: info.payload,
                    error: info.error
                });
            }
            else {
                throw new Error(info.error.errorInfo);
            }
        }
        else{
            throw new Error(portInfo.error.errorInfo);
        }
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


module.exports = {
    discover,
    info,
}
