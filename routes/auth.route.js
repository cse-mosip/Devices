const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();


router.post('/discover', authController.discover);

router.get('/capture', authController.capture);
router.get('/info', authController.info);

module.exports = router;