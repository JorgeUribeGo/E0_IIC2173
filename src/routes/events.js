const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/eventsController');

router.post('/', createEvent);

module.exports = router;