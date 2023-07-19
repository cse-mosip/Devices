const express = require('express');

const dataController = require('../controllers/data.controller');

const router = express.Router();

router.post('/testDevice', dataController.test_device);
router.get('/testCapture', dataController.test_capture);

module.exports = router;