const validator = require('../helpers/validate');

const savePlayer = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    position: 'required|string',
    teamOn: 'required|string',
    rushingYards: 'required',
    passYards: 'required',
    receptions: 'required',
    receivingYards: 'required',
    rushingTouchdowns: 'required',
    passingTouchdowns: 'required',
    receivingTouchdowns: 'required',
    totalPoints: 'required',
    positionRank: 'required'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePlayer
};