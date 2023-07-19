const axios = require('axios');

const Constatnts = require('../helpers/constants');

const findDevice = async (typeInfo) => {

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
        url: Constatnts.BASE_PORT_URL + "device",
        data: typeInfo
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        throw err;
    });
}

// TODO: use jwt decrypt as a helper for deviceInfo
const deviceInfo = async () => {

    return axios({
        method: 'MOSIPDINFO',
        url: Constatnts.BASE_PORT_URL + "info"
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        throw err;
    });
}

// TODO: use jwt decrypt as a helper for bioInfo
const capture = async (captureInfo) => {

    return axios({
        method: 'CAPTURE',
        url: Constatnts.BASE_PORT_URL + "capture",
        data: captureInfo
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        throw err;
    });
}

const registrationCapture = async () => {

}

const deviceStream = async () => {

}

module.exports = {
    findDevice,
    deviceInfo,
    capture,
    registrationCapture,
    deviceStream,
};
