require("dotenv").config();

const mdsService = require("../services/mds.service");

//test endpoint
const test_device = async (req, res) => {
    try {
        let device = await mdsService.findDevice(req.body);
        // console.log(device);
        res.status(200).json(device.data);
    } 
    catch (error) {
        // console.log(error);
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    test_device,
};
