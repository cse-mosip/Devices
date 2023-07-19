require("dotenv").config();

const mdsService = require("../services/mds.service");

//test endpoint
const test_device = async (req, res) => {
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



module.exports = {
    test_device,
};
