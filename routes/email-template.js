const express = require('express');
const { validationResult } = require('express-validator');

//config files imports
const STATIC = require('../config/staticValues');

const QUERY = require('../config/db-query/email-template');
const RESPONCE = require('../config/responces');
const RESPONSE_MESSAGES = require('../config/respMsgs');
const checkToken = require('../config/jwt/jwtMiddleware');


var router = express.Router();
const ITEM = 'Email Template';


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
//  create template API
//-------------------------------------------------------------
router.post('/create', async function(req, res, next) {
    try {
    
        const {name, design, description} = req.body;

        // searching template for that name
        const qr = await QUERY.findItem({name});
        if(qr && qr.length <= 0){
          //template not exist
          let cd = {name, design, description};
          const cu = await QUERY.createItem(cd);
          if(cu){
            // template created
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.templateCreateSuccess);
          }
        }else if(qr && qr.length > 0){
          // template name exist 
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.templateExist, null, null);
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
//  template update API
//-------------------------------------------------------------
router.patch('/update', async function(req, res, next) {
    try {
    
        const { id, updateData } = req.body;

        // searching template for that ID
        const qr = await QUERY.findItem({_id: id});
        if(qr && qr.length <= 0){
          //template not exist
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.templateNotFound);
        }else if(qr && qr.length > 0){
          // template exist 
          const result = await QUERY.updateItem(qr[0]._id, updateData);
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.templateUpdatedSuccess);
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
//  get all template list API
//-------------------------------------------------------------
router.post('/getall', async function(req, res, next) {
    try {
    
        // fetching template
        const qr = await QUERY.findAllItem({}, true);
        if(qr && qr.length <= 0){

            //template not exist
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.templateNotFound, []);
        }else if(qr && qr.length > 0){

            // template exist 
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.templateFound, qr);
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
//  get template by filter data API
//-------------------------------------------------------------
router.post('/getbyfilter', async function(req, res, next) {
    try {
    
        const { filterdata, offset, limit } = req.body;

        // searching template for that name
        const qr = await QUERY.findAllItemWithOffsetLimit(offset, limit, filterdata);
        if(qr && qr.length <= 0){
            //template not exist
            RESPONCE.errorResponce(res, RESPONSE_MESSAGES.templateNotFound, []);
        }else if(qr && qr.length > 0){
            // template exist 
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.templateFound, qr);
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
//  template delete API
//-------------------------------------------------------------
router.patch('/delete', async function(req, res, next) {
    try {
    
        const { id } = req.body;

        // searching template for that ID
        const qr = await QUERY.findItem({_id: id});
        if(qr && qr.length <= 0){

          //template not exist
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.templateNotFound);
        }else if(qr && qr.length > 0){

          // template exist 
          const result = await QUERY.updateItem(qr[0]._id, {is_deleted: true});
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.templateDeleteSuccess);
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