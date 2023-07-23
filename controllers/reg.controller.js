require("dotenv").config();

// const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

const mdsService = require("../services/mds.service");

const rInfo = async (req, res) => {
    try {
        let info = await mdsService.deviceInfo();
        // console.log(info);

        if (info.error.errorCode === '0'){
            res.status(200).send({
                deviceInfo: info.payload,
                error: info.error
            });
        }
        else{
            res.status(400).send(info.error);
        }
        
    } catch (error) {
        // console.log(error.message);
        res.status(400).json({ 
            success: false,
            error: error.message 
        });
    }
}

const rCapture = async (req, res) => {

    let testBody = {
        "env": "Staging",
        "purpose": "Registration",
        "specVersion": "0.9.5",
        "timeout": 100000,
        "captureTime": new Date().toISOString(),
        "transactionId": "Trans123456",
        "bio": [
            {
                "type": "Finger",
                "count": "1",
                "bioSubType": [
                    
                ],
                "exception": null,
                "requestedScore": "40",
                "deviceId": "4722472",
                "deviceSubId": "2",
                "previousHash": ""
            }
        ],
        "customOpts": null,
    }
    
    try {

        let info = await mdsService.rCapture(testBody);

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
    rCapture,
    rInfo
}







