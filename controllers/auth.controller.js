require("dotenv").config();


const mdsService = require("../services/mds.service");

const capture = async (req, res) => {

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
                "previousHash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855"
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
        let info = await mdsService.capture(req.body);
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
    capture,
};
