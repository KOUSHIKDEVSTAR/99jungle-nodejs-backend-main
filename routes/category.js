const express = require('express');
const { validationResult } = require('express-validator');

//config files imports
const STATIC = require('../config/staticValues');
// const QUERY_USERS = require('../config/db-query/user');
const QUERY = require('../config/db-query/category');
const RESPONCE = require('../config/responces');
const RESPONSE_MESSAGES = require('../config/respMsgs');
const { USER_REGISTER_DATA_VALIDATORS, CATEGORY_UPDATE_DATA_VALIDATORS, CATEGORY_ADD_DATA_VALIDATORS, CATEGORY_DELETE_DATA_VALIDATORS } = require('../config/express-validators/validator');
const generateJwtToken = require('../config/jwt/generateToken');

// helper functions
const { comparePassword, hashPassword } = require('../helpers/bcrypt');

const USER_ROLE = '600039277fecd1252473068b';
const ADMIN_ROLE = '60001006d14b7115108cb5cc';

// model imports
const USER = require('../models/user');
const CATEGORY = require('../models/category');
const sendEmail = require('../config/node-mailer/nodemailer');
const { generateRandomNumber } = require('../helpers/commonHelperMethods');
const checkToken = require('../config/jwt/jwtMiddleware');

var router = express.Router();
const ITEM = 'Category';


//-------------------------------------------------------------
//  Error handler
//-------------------------------------------------------------
const Error_Handler = (error, res) => {
    if(error && error.message){
        RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
      }else if(error && error._message){
        RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
      }else{
        RESPONCE.errorResponce(res, RESPONSE_MESSAGES.servererrorMsg, null, error.errors ? error.errors : error);
      }
}



//-------------------------------------------------------------
//  category create API
//-------------------------------------------------------------
router.post('/create', CATEGORY_ADD_DATA_VALIDATORS, async function(req, res, next) {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        return RESPONCE.errorResponce(res, 'Requested data is not valid', null, errors.array());
      }
    
        const {name, parent_id, lavel, description} = req.body;
        // searching category for that name
        // console.log(name, parent_id, level, description);
        const qr = await QUERY.findItem({name});
        if(qr && qr.length <= 0){
          //category not exist
          let cd = {name, parent_id, lavel, description};
          const cu = await QUERY.createItem(cd);
          if(cu){
            // category created
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.categoryCreateSuccess);
          }
        }else if(qr && qr.length > 0){
          // category name exist 
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.categoryExist, null, null);
        }
        
    } catch (error) {
    
        // error response
        console.log(error);
        if(error && error.message){
          RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
        }else if(error && error._message){
          RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
        }else{
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.categoryerror, null, error.errors ? error.errors : error);
        }
        
    }
});



//-------------------------------------------------------------
//  category update API
//-------------------------------------------------------------
router.patch('/update', CATEGORY_UPDATE_DATA_VALIDATORS, async function(req, res, next) {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        return RESPONCE.errorResponce(res, 'Requested data is not valid', null, errors.array());
      }
    
        const { id, updateData } = req.body;
        // searching category for that ID
        console.log('request   ', req.body);
        console.log('id   ', id);
        const qr = await QUERY.findItem({_id: id});
        console.log('query result     ', qr);
        if(qr && qr.length <= 0){
          //category not exist
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.categoryNotFound);
        }else if(qr && qr.length > 0){
          // category exist 
          const result = await QUERY.updateItem(qr[0]._id, updateData);
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.categoryUpdatedSuccess);
          }
        }
        
    } catch (error) {
    
        // error response
        console.log(error);
        if(error && error.message){
          RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
        }else if(error && error._message){
          RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
        }else{
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.categoryerror, null, error.errors ? error.errors : error);
        }
        
    }
});




//-------------------------------------------------------------
//  get all category list API
//-------------------------------------------------------------
router.post('/getall', async function(req, res, next) {
    try {
    
        // fetching category
        const qr = await QUERY.findAllItem({}, true);
        if(qr && qr.length <= 0){
            //category not exist
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.categoryNotFound, []);
        }else if(qr && qr.length > 0){
            // category exist 
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.categoryFound, qr);
        }
        
    } catch (error) {
    
        // error response
        console.log(error);
        if(error && error.message){
          RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
        }else if(error && error._message){
          RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
        }else{
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.categoryerror, null, error.errors ? error.errors : error);
        }
        
    }
});




//-------------------------------------------------------------
//  get category by filter data API
//-------------------------------------------------------------
router.post('/getbyfilter', async function(req, res, next) {
    try {
    
        const { filterdata, offset, limit } = req.body;
        // searching category for that name
        const qr = await QUERY.findAllItemWithOffsetLimit(offset, limit, filterdata);
        if(qr && qr.length <= 0){
            //category not exist
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.categoryNotFound, []);
        }else if(qr && qr.length > 0){
            // category name exist 
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.categoryFound, qr);
        }
        
    } catch (error) {
    
        // error response
        console.log(error);
        if(error && error.message){
          RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
        }else if(error && error._message){
          RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
        }else{
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.categoryerror, null, error.errors ? error.errors : error);
        }
        
    }
});





//-------------------------------------------------------------
//  category delete API
//-------------------------------------------------------------
router.patch('/delete', CATEGORY_DELETE_DATA_VALIDATORS, async function(req, res, next) {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        return RESPONCE.errorResponce(res, 'Requested data is not valid', null, errors.array());
      }
    
        const { id } = req.body;
        // searching category for that ID
        const qr = await QUERY.findItem({_id: id});
        if(qr && qr.length <= 0){
          //category not exist
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.categoryNotFound);
        }else if(qr && qr.length > 0){
          // category exist 
          const result = await QUERY.updateItem(qr[0]._id, {is_deleted: true});
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.categoryDeleteSuccess);
          }
        }
        
    } catch (error) {
    
        // error response
        console.log(error);
        if(error && error.message){
          RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
        }else if(error && error._message){
          RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
        }else{
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.categoryerror, null, error.errors ? error.errors : error);
        }
        
    }
});




//-------------------------------------------------------------
//  Product Type permanent delete
//-------------------------------------------------------------
router.delete('/deleteItem', checkToken, async function(req, res, next) {
  try {
  
      const { id } = req.body;

      // searching TAG for that ID
      const qr = await QUERY.deleteItem(id);
      console.log('delete return data   :   ', qr);

      if(qr){
        RESPONCE.successResponce(res, 'Deleted Successfully', null, null, ITEM);
      }else{
        RESPONCE.errorResponce(res, 'Not deleted', null, null, ITEM);
      }
      
  } catch (error) {
  
      // error response
      console.log(error);
      Error_Handler(error, res);
      
  }
});





module.exports = router;