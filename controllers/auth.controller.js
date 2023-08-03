require("dotenv").config();


const mdsService = require("../services/mds.service");

const capture = async (req, res) => {

    try {

        let info = await mdsService.deviceInfo(process.env.MDS_PORT_L0);

        const payload = info.payload;
        const deviceStatus = payload.deviceStatus;
        
        if (deviceStatus === 'Ready'){
            console.log('device ready');
            
            const deviceSubId = req.body.deviceSubId;
            const requestedScore = 40;
            const deviceId = payload.deviceId;
            const captureTime = new Date().toISOString()

            const requestBody = {
                "env": "Staging",
                "purpose": "Authentication",
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

            let data = await mdsService.rCapture(requestBody);
            let fingerPrints = [];
    
            let error = false;
    
            for (let i = 0; i < data.length; i++){
                let fingerObj = data[i].data;
                let errorObj = data[i].error;

                // if even one finger print has an error
                if (errorObj.errorInfo !== 'Success'){
                    error = true;
                    break;
                }

                // if even one finger's quality is not enough
                if (parseInt(fingerObj.requestedScore, 10) > parseInt(fingerObj.qualityScore, 10)){
                    error = true;
                    break;
                }
    
                // decode bio values and get image buffer
                let fingerPrintImageBuffer = utils.extractImage(fingerObj.bioValue);
                fingerPrints.push({ buffer: fingerPrintImageBuffer, bioSubType: fingerObj.bioSubType });
                // console.log(bioValue);
    
            }
    
            if (! error) {
                console.log(fingerPrints);
                res.status(200).json(fingerPrints);
            }
            else {
                res.status(400).json({ 
                    success: false,
                    error: 'Hariyata angillakwath thiyaganna ba neda' 
                });
            }
        }else{
            res.status(500).json({ 
                success: false,
                error: 'device not ready'
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
