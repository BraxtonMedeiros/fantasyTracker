const express = require('express');
const router = express.Router();

const fantasyController = require('../controllers/index');

router.get('/', fantasyController.getAll);

router.get('/:id', fantasyController.getSingle);

router.post('/', fantasyController.createPlayer);

router.put('/:id', fantasyController.updatePlayer);

router.delete('/:id', fantasyController.deletePlayer);

module.exports = router;