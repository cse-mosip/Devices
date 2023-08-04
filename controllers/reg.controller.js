require("dotenv").config();

const utils = require('../helpers/util');

const mdsService = require("../services/mds.service");

const rCapture = async (req, res) => {

    try {

        let portInfo = await utils.checkPort();

        if (portInfo.error.errorCode === '0') {

            let port = portInfo.port;
            let info = await mdsService.deviceInfo(port);

            const payload = info.payload;
            const deviceStatus = payload.deviceStatus;

            if (deviceStatus === 'Ready') {
                console.log('device ready');

                const deviceSubId = req.body.deviceSubId;
                const requestedScore = 40;
                const deviceId = payload.deviceId;
                const captureTime = new Date().toISOString()

                const requestBody = {
                    "env": "Staging",
                    "purpose": "Registration",
                    "specVersion": "0.9.5",
                    "timeout": 10000,
                    "captureTime": captureTime,
                    "transactionId": "Trans123456",
                    "bio": [
                        {
                            "type": "Finger",
                            "count": "1",
                            "bioSubType": [
                                ""
                            ],
                            "exception": null,
                            "requestedScore": requestedScore,
                            "deviceId": deviceId,
                            "deviceSubId": deviceSubId,
                            "previousHash": ""
                        }
                    ],
                    "customerOpts": null
                }

                const result = await mdsService.rCapture(requestBody, port);
                // console.log(result);
                
                if (result.error.errorCode !== '0'){
                    throw new Error(result.error.erroInfo);
                }

                const fingerDataArray = result.data;
                // console.log(fingerDataArray);
                
                let fingerPrints = [];

                for (let i = 0; i < fingerDataArray.length; i++) {
                    let fingerObj = fingerDataArray[i].payload;

                    // decode bio values and get image buffer
                    let fingerPrintImageBuffer = utils.extractImage(fingerObj.bioValue);

                    if (fingerPrintImageBuffer.error.errorCode !== '0'){
                        throw new Error(fingerPrintImageBuffer.error.errorInfo);
                    }

                    fingerPrints.push({ buffer: fingerPrintImageBuffer.buffer, bioSubType: fingerObj.bioSubType });
                }

                // console.log(fingerPrints);

                res.status(200).json({
                    success: true,
                    error: "",
                    data: fingerPrints
                });
            }
            else {
                throw new Error("Device not ready");
            }
        }
        else {
            throw new Error(portInfo.error.errorInfo);
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    rCapture,
}







