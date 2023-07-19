const axios = require('axios');

const Constatnts = require('../helpers/constants');

const findDevice = async (typeInfo) => {

    try {
        const res = await axios.post(Constatnts.BASE_PORT_URL + "device", typeInfo);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deviceInfo = async () => {

}

const capture = async () => {

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
