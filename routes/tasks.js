const router = require('express').Router();
const controller = require('../controllers/tasks');

router.get('/', function(req, res, next) {
    res.send([
        { name: "1", stage: 1 },
        { name: "2", stage: 0 },
      ]);
  });

module.exports = router;
