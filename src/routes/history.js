const express = require('express');
const router = express.Router();
const { getHistory, getHistoryById } = require('../controllers/historyController');

router.get('/', getHistory);
router.get('/:id', getHistoryById);


module.exports = router;