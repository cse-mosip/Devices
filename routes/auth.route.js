const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

//POST
router.post('/discover', authController.discover);
router.post('/capture', authController.capture);

//GET
router.get('/info', authController.info);

module.exports = router;