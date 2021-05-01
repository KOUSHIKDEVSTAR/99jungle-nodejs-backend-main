const express = require('express');
const { validationResult } = require('express-validator');

//config files imports
const STATIC = require('../config/staticValues');
const QUERY_ROLE = require('../config/db-query/role');
const RESPONCE = require('../config/responces');
const RESPONSE_MESSAGES = require('../config/respMsgs');
const { USER_REGISTER_DATA_VALIDATORS } = require('../config/express-validators/validator');

// model imports
const ROLE = require('../models/roles');


var router = express.Router();



//-------------------------------------------------------------
//  create role api
//-------------------------------------------------------------
router.post('/create', async function(req, res, next) {
  
  try {

    const {name, role_type} = req.body;
    // searching role for that name
    const qr = await QUERY_ROLE.findItemFromRoleTable({name, role_type});
    if(qr && qr.length <= 0){
      //if role not exist
      let createdata = {name, role_type};
      const cu = await QUERY_ROLE.createItemForRoleTable(createdata);
      if(cu){
        console.log('user created  :  ', cu._id);
        RESPONCE.successResponce(res, RESPONSE_MESSAGES.roleCreateSuccess);
      }
    }else if(qr && qr.length > 0){
      // role exist 
      RESPONCE.successResponce(res, RESPONSE_MESSAGES.allReadyHaveTheRole);
    }
    
  } catch (error) {
    
    // error response
    if(error && error.message){
      RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
    }else if(error && error._message){
      RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
    }else{
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.roleCreateError, null, error.errors ? error.errors : error);
    }
    
  }
  
});



module.exports = router;

