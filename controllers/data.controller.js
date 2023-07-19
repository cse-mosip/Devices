require("dotenv").config();

const mdsService = require("../services/mds.service");

//test endpoints
const test_device = async (req, res) => {

    // let testBody = {
    //     "type": "Biometric Device"
    // }

    try {
        let device = await mdsService.findDevice(req.body);

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

//tested only one
const test_capture = async (req, res) => {

    let testBody = {
        "env": "Staging",
        "purpose": "Auth",
        "specVersion": "0.9.5",
        "timeout": 10000,
        "captureTime": new Date().toISOString(),
        "transactionId": "Trans123456",
        "bio": [
            {
                "type": "Finger",
                "count": "1",
                "bioSubType": [
                    
                ],
                "exception": null,
                "requestedScore": "80",
                "deviceId": "4856814",
                "deviceSubId": "0",
                "previousHash": ""
            }
        ],
        "customOpts": null,
        "domainUri": ""
    }

    // info.data = { biometrics: [ { error: [Object] } ] }
    // info.data.biometrics[0].error = { errorCode: '-31', errorInfo: 'Biometric capture timeout occurred.' }
    // info.data.biometrics[0].error = { errorCode: '0', errorInfo: 'Success' }
    
    try {

        // let info = await mdsService.capture(req.body);
        let info = await mdsService.capture(testBody);
        // console.log(info.data.biometrics[0].error);

        if (info.data.biometrics[0].error.errorInfo === "Success") {

            res.status(200).json({ 
                success: true,
                device: info.data.biometrics[0]
            });
        }
        else {

            res.status(400).json({ 
                success: false,
                error: 'Biometric capture timeout' 
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

module.exports = {
    test_device,
    test_capture,
};
