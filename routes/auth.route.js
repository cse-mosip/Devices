const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

//POST
router.post('/discover', authController.discover);

//GET
router.get('/capture', authController.capture);
router.get('/info', authController.info);

module.exports = router;