const express = require('express');
const { validationResult } = require('express-validator');

//config files imports
const STATIC = require('../config/staticValues');

const QUERY = require('../config/db-query/occassion');
const RESPONCE = require('../config/responces');
const RESPONSE_MESSAGES = require('../config/respMsgs');
const checkToken = require('../config/jwt/jwtMiddleware');

var router = express.Router();
const ITEM = 'Occassion';


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
//  OCCASSION create API
//-------------------------------------------------------------
router.post('/create', checkToken, async function(req, res, next) {
    try {
    
        const {name} = req.body;

        // searching TAG for that name
        const qr = await QUERY.findItem({name});
        if(qr && qr.length <= 0){
          //TAG not exist
          let cd = req.body;
          const cu = await QUERY.createItem(cd);
          if(cu){
            // TAG created
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.occassionCreateSuccess);
          }
        }else if(qr && qr.length > 0){
          // TAG name exist 
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.occassionExist, null, null);
        }
        
    } catch (error) {
    
        // error response
        console.log(error);
        if(error && error.message){
          RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
        }else if(error && error._message){
          RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
        }else{
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.servererrorMsg, null, error.errors ? error.errors : error);
        }
        
    }
});



//-------------------------------------------------------------
//  OCCASSION update API
//-------------------------------------------------------------
router.patch('/update', checkToken, async function(req, res, next) {
    try {
    
        const { id, updateData } = req.body;

        // searching TAG for that ID
        const qr = await QUERY.findItem({_id: id});
        if(qr && qr.length <= 0){
          //TAG not exist
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.occassionNotFound);
        }else if(qr && qr.length > 0){
          // TAG exist 
          const result = await QUERY.updateItem(qr[0]._id, updateData);
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.occassionUpdatedSuccess);
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
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.servererrorMsg, null, error.errors ? error.errors : error);
        }
        
    }
});




//-------------------------------------------------------------
//  get all Occassion list API
//-------------------------------------------------------------
router.post('/getall', async function(req, res, next) {
    try {
    
        // fetching TAG
        const qr = await QUERY.findAllItem({}, true);
        if(qr && qr.length <= 0){

            //TAG not exist
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.occassionNotFound, []);
        }else if(qr && qr.length > 0){

            // TAG exist 
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.occassionFound, qr);
        }
        
    } catch (error) {
    
        // error response
        console.log(error);
        if(error && error.message){
          RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
        }else if(error && error._message){
          RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
        }else{
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.servererrorMsg, null, error.errors ? error.errors : error);
        }
        
    }
});




//-------------------------------------------------------------
//  get OCCASSIONS by filter data API
//-------------------------------------------------------------
router.post('/getbyfilter', async function(req, res, next) {
    try {
    
        const { filterdata, offset, limit } = req.body;

        // searching TAG for that name
        const qr = await QUERY.findAllItemWithOffsetLimit(offset, limit, filterdata);
        if(qr && qr.length <= 0){
            //TAG not exist
            RESPONCE.errorResponce(res, RESPONSE_MESSAGES.occassionNotFound, []);
        }else if(qr && qr.length > 0){
            // TAG exist 
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.occassionFound, qr);
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
//  OCCATION delete API
//-------------------------------------------------------------
router.patch('/delete', checkToken, async function(req, res, next) {
    try {
    
        const { id } = req.body;

        // searching TAG for that ID
        const qr = await QUERY.findItem({_id: id});
        if(qr && qr.length <= 0){

          //TAG not exist
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.occassionNotFound);
        }else if(qr && qr.length > 0){

          // TAG exist 
          const result = await QUERY.updateItem(qr[0]._id, {is_deleted: true});
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.occassionDeleteSuccess);
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
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.servererrorMsg, null, error.errors ? error.errors : error);
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