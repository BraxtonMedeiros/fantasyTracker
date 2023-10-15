const express = require('express');
const router = express.Router();

router.use('/fantasy', require('./fantasy'));

module.exports = router;