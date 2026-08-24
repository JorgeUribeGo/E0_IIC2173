const express = require('express');
const router = express.Router();
const { getHistory, getHistoryById } = require('../controllers/historyController');

router.get('/:id', getHistoryById);
router.get('/', getHistory);


module.exports = router;