const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { body, validationResult } = require('express-validator');
// Validation rules for the request body
const validationRules = [
  body('firstName').not().isEmpty().withMessage('First name is required'),
  body('position').not().isEmpty().withMessage('Position is required'),
  // Add more validation rules for other fields
];

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('fantasy').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err){
    res.status(500).json({ message: err.message });
  };
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('fantasy')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err){
    res.status(500).json({ message: err.message });
  };
};

const createPlayer = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const player = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      teamOn: req.body.teamOn,
      rushingYards: req.body.rushingYards,
      passYards: req.body.passYards,
      receptions: req.body.receptions,
      receivingYards: req.body.receivingYards,
      rushingTouchdowns: req.body.rushingTouchdowns,
      passingTouchdowns: req.body.passingTouchdowns,
      receivingTouchdowns: req.body.receivingTouchdowns,
      totalPoints: req.body.totalPoints,
      positionRank: req.body.positionRank
    };
  
    const response = await mongodb.getDb().db().collection('fantasy').insertOne(player);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occured while creating the contact.');
    }
  } catch (err){
    res.status(500).json({ message: err.message });
  };
}

const updatePlayer = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const player = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      teamOn: req.body.teamOn,
      rushingYards: req.body.rushingYards,
      passYards: req.body.passYards,
      receptions: req.body.receptions,
      receivingYards: req.body.receivingYards,
      rushingTouchdowns: req.body.rushingTouchdowns,
      passingTouchdowns: req.body.passingTouchdowns,
      receivingTouchdowns: req.body.receivingTouchdowns,
      totalPoints: req.body.totalPoints,
      positionRank: req.body.positionRank
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('fantasy')
      .replaceOne({ _id: userId }, player);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  } catch (err){
    res.status(500).json({ message: err.message });
  };
};

const deletePlayer = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('fantasy').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  } catch (err){
    res.status(500).json({ message: err.message });
  };
};

module.exports = { getAll, getSingle, createPlayer, updatePlayer, deletePlayer, validationRules };