const express = require('express');

const dataController = require('../controllers/data.controller');

const router = express.Router();

//POST
router.post('/discover', dataController.discover);

//GET
router.get('/info', dataController.info);

module.exports = router;