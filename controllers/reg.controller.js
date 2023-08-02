require("dotenv").config();

const utils = require('../helpers/util');

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
    
    try {

        let data = await mdsService.rCapture(req.body);
        let bioValues = [];

        // console.log(data);

        let error = false;

        for (let i = 0; i < data.length; i++){
            let fingerObj = data[i].data;
            let errorObj = data[i].error;
            if (errorObj.errorInfo !== 'Success'){
                error = true;
                break;
            }

            let bioValue = utils.extractImage(fingerObj.bioValue);
            bioValues.push(bioValue);
            // console.log(bioValue);

        }

        if (! error) {
            res.status(200).json(data);
        }
        else {
            res.status(400).json({ 
                success: false,
                error: 'Biometric capture failed' 
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







