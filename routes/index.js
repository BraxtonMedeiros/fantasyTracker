const express = require('express');
const router = express.Router();

router.use('/fantasy', require('./fantasy'));
router.use('/', require('./swagger'));

module.exports = router;