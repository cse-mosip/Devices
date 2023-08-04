const axios = require('axios');

const Constants = require('../helpers/constants');

// data retrieval
const findDevice = async (typeInfo, mds_port) => {

    return axios({
        method: 'MOSIPDISC',
        url: Constants.BASE_URL + ":" + mds_port + "/device",
        data: typeInfo
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        throw err;
    });
}

const deviceInfo = async (mds_port) => {

    return axios({
        method: 'MOSIPDINFO',
        url: Constants.BASE_URL + ":" + mds_port + "/info"
    })
    .then((res) => {
        console.log(res.data);
        if (res.data.length !== 0){
            const deviceInfoEncoded = res.data[0].deviceInfo;
            const error = res.data[0].error;
    
            const [headerEncoded, payloadEncoded] = deviceInfoEncoded.split('.');
    
            const header = JSON.parse(Buffer.from(headerEncoded, 'base64').toString('utf-8'));
            const payload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString('utf-8'));
            return { header, payload, error };
        }
        else{
            return { error: { errorInfo: 'device not connected' } }
        }
    })
    .catch((err) => {
        return err.message;
    });
}

// authentication
// TODO: use jwt decrypt as a helper for bioInfo
const capture = async (captureInfo) => {

    return axios({
        method: 'CAPTURE',
        url: Constants.BASE_PORT_URL + "capture",
        data: captureInfo
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        throw err;
    });
}


// registration
const rCapture = async (rCaptureInfo) => {
    return axios({
        method: 'RCAPTURE',
        url: Constants.BASE_PORT_URL_2 + "capture",
        data: rCaptureInfo
    })
    .then((res) => {
        // console.log(res.data.biometrics);
        const fingerDataArray = [];

        res.data.biometrics.forEach(finger => {
            if (finger.error.errorCode === '0'){
                const encodedData = finger.data;
                const [headerEncoded, payloadEncoded] = encodedData.split('.');
    
                const header = JSON.parse(Buffer.from(headerEncoded, 'base64').toString('utf-8'));
                const payload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString('utf-8'));
    
                fingerDataArray.push({
                    specVersion: finger.specVersion,
                    data: payload,
                    hash: finger.hash,
                    error: finger.error
                });

            }
            else{
                fingerDataArray.push({
                    error: finger.error
                });
            }
        });
        return fingerDataArray;

    })
    .catch((err) => {
        console.log(err.message);
    });
}

module.exports = {
    findDevice,
    deviceInfo,
    capture,
    rCapture,
};
