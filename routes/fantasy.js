const express = require('express');
const router = express.Router();

const fantasyController = require('../controllers/index');
const validation = require('../middleware/validate');

router.get('/', fantasyController.getAll);

router.get('/:id', fantasyController.getSingle);

router.post('/', validation.savePlayer, fantasyController.createPlayer);

router.put('/:id', validation.savePlayer, fantasyController.updatePlayer);

router.delete('/:id', fantasyController.deletePlayer);

module.exports = router;