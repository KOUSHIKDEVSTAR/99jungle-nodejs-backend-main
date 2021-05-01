var express = require('express');
const STATIC = require('../config/staticValues');
var router = express.Router();


//-------------------------------------------------------------
//  INDEX route
//-------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.send({api_version: '1.0', owner: '99jungle', description: 'Backend API providor for 99Jungle'});
});



module.exports = router;
