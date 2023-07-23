const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

//POST
router.post('/capture', authController.capture);


module.exports = router;