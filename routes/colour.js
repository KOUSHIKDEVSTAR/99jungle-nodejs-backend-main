const express = require('express');
const { validationResult } = require('express-validator');

//config files imports
const STATIC = require('../config/staticValues');

// const QUERY_USERS = require('../config/db-query/user');
const QUERY = require('../config/db-query/colour');
const RESPONCE = require('../config/responces');
const RESPONSE_MESSAGES = require('../config/respMsgs');
const checkToken = require('../config/jwt/jwtMiddleware');

var router = express.Router();
const ITEM = 'Color';


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
//  color add API
//-------------------------------------------------------------
router.post('/create', checkToken, async function(req, res, next) {
    try {
    
        const {name} = req.body;

        // searching color for that name
        const qr = await QUERY.findItem({name});
        if(qr && qr.length <= 0){
          //color not exist
          let cd = req.body;
          const cu = await QUERY.createItem(cd);
          if(cu){
            // color created
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.colorCreateSuccess);
          }
        }else if(qr && qr.length > 0){
          // TAG name exist 
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.colorExist, null, null);
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
//  color update API
//-------------------------------------------------------------
router.patch('/update', checkToken, async function(req, res, next) {
    try {
    
        const { id, updateData } = req.body;

        // searching color for that ID
        const qr = await QUERY.findItem({_id: id});
        if(qr && qr.length <= 0){
          //color not exist
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.colorNotFound);
        }else if(qr && qr.length > 0){
          // color exist 
          const result = await QUERY.updateItem(qr[0]._id, updateData);
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.colorUpdatedSuccess);
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
//  get all COLOR list API
//-------------------------------------------------------------
router.post('/getall', async function(req, res, next) {
    try {
    
        // fetching color
        const qr = await QUERY.findAllItem({}, true);
        if(qr && qr.length <= 0){

            //color not exist
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.colorNotFound, []);
        }else if(qr && qr.length > 0){

            // color exist 
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.colorFound, qr);
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
//  get COLOR by filter data API
//-------------------------------------------------------------
router.post('/getbyfilter', checkToken, async function(req, res, next) {
    try {
    
        const { filterdata, offset, limit } = req.body;

        // searching color for that name
        const qr = await QUERY.findAllItemWithOffsetLimit(offset, limit, filterdata);
        if(qr && qr.length <= 0){

            //color not exist
            RESPONCE.errorResponce(res, RESPONSE_MESSAGES.tagNotFound, []);
        }else if(qr && qr.length > 0){

            //color exist 
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.tagFound, qr);
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
//  color delete API
//-------------------------------------------------------------
router.patch('/delete', checkToken, async function(req, res, next) {
    try {
    
        const { id } = req.body;

        // searching COLOR for that ID
        const qr = await QUERY.findItem({_id: id});
        if(qr && qr.length <= 0){

          //COLOR not exist
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.colorNotFound);
        }else if(qr && qr.length > 0){

          // COLOR exist 
          const result = await QUERY.updateItem(qr[0]._id, {is_deleted: true});
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.colorDeleteSuccess);
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