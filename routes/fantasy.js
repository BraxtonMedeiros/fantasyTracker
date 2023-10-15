const express = require('express');
const router = express.Router();

const fantasyController = require('../controllers/index');

router.get('/', fantasyController.getAll);

router.get('/:id', fantasyController.getSingle);

router.post('/', fantasyController.createContact);

router.put('/:id', fantasyController.updateContact);

router.delete('/:id', fantasyController.deleteContact);

module.exports = router;