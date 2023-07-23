const axios = require('axios');
// const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
// const client = jwksClient({
//     jwksUri: 'https://sandrino.auth0.com/.well-known/jwks.json'
// });

// function getKey(header, callback){
//     client.getSigningKey(header.kid, function(err, key) {
//         var signingKey = key.getPublicKey();
//         callback(null, signingKey);
//     });
// }

const Constants = require('../helpers/constants');

const findDevice = async (typeInfo, mds_port) => {

    // try {
    //     const res = await axios.post(Constatnts.BASE_PORT_URL + "device", typeInfo);
    //     console.log(res);
    //     return res;
    // } catch (error) {
    //     console.log(error);
    //     throw error;
    // }

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
        const deviceInfoEncoded = res.data[0].deviceInfo;
        const error = res.data[0].error;

        const [headerEncoded, payloadEncoded] = deviceInfoEncoded.split('.');

        const header = JSON.parse(Buffer.from(headerEncoded, 'base64').toString('utf-8'));
        const payload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString('utf-8'));
        return { header, payload, error };
    })
    .catch((err) => {
        return err.message;
        // throw err;
    });
}

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

const rCapture = async (rCaptureInfo) => {
    return axios({
        method: 'RCAPTURE',
        url: Constants.BASE_PORT_URL_2 + "capture",
        data: rCaptureInfo
    })
    .then((res) => {
        console.log(length(res.data.biometrics));
        console.log(res.data.biometrics);
        // const deviceRCaptureEncoded = res.data[0].deviceInfo;
        // const error = res.data[0].error;

        // const [headerEncoded, payloadEncoded] = deviceInfoEncoded.split('.');

        // const header = JSON.parse(Buffer.from(headerEncoded, 'base64').toString('utf-8'));
        // const payload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString('utf-8'));
        // return { header, payload, error };
    })
    .catch((err) => {
        console.log(err.message);
        // throw err;
    });
}

const stream = async () => {

}

module.exports = {
    findDevice,
    deviceInfo,
    capture,
    rCapture,
    stream,
};
