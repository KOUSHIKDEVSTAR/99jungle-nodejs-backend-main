const express = require('express');
const { validationResult } = require('express-validator');

//config files imports
const STATIC = require('../config/staticValues');

const QUERY = require('../config/db-query/user');
const RESPONCE = require('../config/responces');
const RESPONSE_MESSAGES = require('../config/respMsgs');
const checkToken = require('../config/jwt/jwtMiddleware');


var router = express.Router();
const ITEM = 'Customer';


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
//  USER update API
//-------------------------------------------------------------
router.patch('/update', async function(req, res, next) {
    try {
    
        const { id, updateData } = req.body;

        // searching USER for that ID
        const qr = await QUERY.findItemByID(id);
        if(qr && qr._id){
          // USER exist 
          const result = await QUERY.updateItem(qr._id, updateData);
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.userUpdatedSuccess);
          }         
        }else{
           //USER not exist
           RESPONCE.errorResponce(res, RESPONSE_MESSAGES.userNotFound);
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
//  get all USER list API
//-------------------------------------------------------------
router.post('/getall', async function(req, res, next) {
    try {
    
        // fetching SIZE
        const qr = await QUERY.findAllItem({});
        if(qr && qr.length <= 0){

            //SIZE not exist
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.userNotFound, []);
        }else if(qr && qr.length > 0){

            // SIZE exist 
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.userFound, qr);
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
//  get USER by filter data API
//-------------------------------------------------------------
// router.post('/getbyfilter', async function(req, res, next) {
//     try {
    
//         const { filterdata, offset, limit } = req.body;

//         // searching SIZE for that name
//         const qr = await QUERY.findAllItemWithOffsetLimit(offset, limit, filterdata);
//         if(qr && qr.length <= 0){
//             //SIZE not exist
//             RESPONCE.errorResponce(res, RESPONSE_MESSAGES.sizeNotFound, []);
//         }else if(qr && qr.length > 0){
//             // SIZE exist 
//             RESPONCE.successResponce(res, RESPONSE_MESSAGES.sizeFound, qr);
//         }
        
//     } catch (error) {
    
//         // error response
//         console.log(error);
//         if(error && error.message){
//           RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
//         }else if(error && error._message){
//           RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
//         }else{
//           RESPONCE.errorResponce(res, RESPONSE_MESSAGES.categoryerror, null, error.errors ? error.errors : error);
//         }
        
//     }
// });





//-------------------------------------------------------------
//  get User data by Id
//-------------------------------------------------------------
router.post('/getbyid', async function(req, res, next) {
  try {

      const { id } = req.body;
  
      // fetching PRODUCT
      const qr = await QUERY.findItemByID(id);
      // console.log('find Item By  ID   :  ', qr);

      if(qr && qr._id){
          // PRODUCT exist 
          RESPONCE.successResponce(res, RESPONSE_MESSAGES.productFound, qr);
      }else{
          RESPONCE.successResponce(res, RESPONSE_MESSAGES.productNotFound, []);
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
//  USER delete API
//-------------------------------------------------------------
router.patch('/delete', async function(req, res, next) {
    try {
    
        const { id } = req.body;

        // searching SIZE for that ID
        const qr = await QUERY.findItemByID(id);
        if(qr && qr._id){
          // SIZE exist 
          const result = await QUERY.updateItem(qr._id, {is_deleted: true});
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.userDeleteSuccess);
          }
        }else{
            //SIZE not exist
            RESPONCE.errorResponce(res, RESPONSE_MESSAGES.userNotFound);
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