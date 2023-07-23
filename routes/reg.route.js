const express = require('express');

const regController = require('../controllers/reg.controller');

const router = express.Router();

router.post('/rcapture', regController.rCapture);


module.exports = router;