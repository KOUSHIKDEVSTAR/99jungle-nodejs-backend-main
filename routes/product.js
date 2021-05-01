const express = require('express');
const { validationResult } = require('express-validator');

//config files imports
const STATIC = require('../config/staticValues');

const QUERY = require('../config/db-query/product');
const TAG_PRODUCT_QUERY = require('../config/db-query/tag-product');
const CATEGORY_PRODUCT_QUERY = require('../config/db-query/category-product');
const RESPONCE = require('../config/responces');
const RESPONSE_MESSAGES = require('../config/respMsgs');
const { upload } = require('../config/multer/multer');
const { createPromiseArray } = require('../config/sharp/sharp');
const { cloudinary } = require('../config/cloudinary/cloudinary');
const checkToken = require('../config/jwt/jwtMiddleware');


var router = express.Router();
const ITEM = 'Product';


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
//  PRODUCT ADD API
//-------------------------------------------------------------
router.post('/create', checkToken, async function(req, res, next) {
    try {    
        const bodydata = req.body;
        // searching PRODUCT for that name
        const qr = await QUERY.findItem({title: bodydata.title});
        if(qr && qr.length <= 0){
          //PRODUCT not exist
          let cd = bodydata;
          const cu = await QUERY.createItem(cd);
          if(cu){
            // PRODUCT created
            // console.log('product created data   :  ', cu);
            if(cu && cu._id){
              // inserting data on category product table
              let cprdata = {category_id: bodydata.category, product_id: cu._id};
              let cpr = await CATEGORY_PRODUCT_QUERY.createItem(cprdata);
              if(cpr){
                console.log('category product inserted successfully');
              }

              if(bodydata.tags && bodydata.tags.length > 0){
                // inserting data on tag product table
                let tagProdArr = bodydata.tags.map((item, index) => {
                  return {product_id: cu._id, tag_id: item};
                })

                if(tagProdArr && tagProdArr.length > 0){
                  // console.log('tags product data   :  ', tagProdArr);
                  let r = await TAG_PRODUCT_QUERY.createMultipleItem(tagProdArr);
                  if(r){
                    console.log('tags product inserted successfully');
                    RESPONCE.successResponce(res, RESPONSE_MESSAGES.productCreateSuccess, {_id: cu._id});
                  }
                }
              }else{
                console.log('no tags found');
                RESPONCE.successResponce(res, RESPONSE_MESSAGES.productCreateSuccess, {_id: cu._id});
              }
            }
            
          }
        }else if(qr && qr.length > 0){
          // PRODUCT name exist 
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.productExist, null, null);
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
//  PRODUCT update API
//-------------------------------------------------------------
router.patch('/update', checkToken, async function(req, res, next) {
    try {
    
        const { id, updateData } = req.body;

        // searching PRODUCT for that ID
        const qr = await QUERY.findItem({_id: id});
        if(qr && qr.length <= 0){
          //PRODUCT not exist
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.productNotFound);
        }else if(qr && qr.length > 0){
          // PRODUCT exist 
          const result = await QUERY.updateItem(qr[0]._id, updateData);
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.productUpdatedSuccess);
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
//  get all PRODUCT list API
//-------------------------------------------------------------
router.post('/getall', checkToken, async function(req, res, next) {
    try {
    
        // fetching PRODUCT
        const qr = await QUERY.findAllItem({}, true);
        if(qr && qr.length <= 0){
            //PRODUCT not exist
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.productNotFound, []);
        }else if(qr && qr.length > 0){
            // PRODUCT exist 
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.productFound, qr);
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
//  get all PRODUCT list API
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
//  get PRODUCT by filter data API
//-------------------------------------------------------------
router.get('/getbyfilter', async function(req, res, next) {
    try {

        // console.log('req.query     :  ', req.query); 
        const {offset, limit, querydata} = req.query;    
        // const { filterdata, offset, limit } = req.body;
        console.log('req.query     :  ', JSON.parse(req.query.querydata));
        let filterQueryData = JSON.parse(req.query.querydata);

        if(filterQueryData.hasOwnProperty("colors") && filterQueryData.colors && filterQueryData.colors.length === 0){
          console.log('colors came but, colors is empty...');
          delete filterQueryData['colors'];
        }else if(filterQueryData.hasOwnProperty("colors") && filterQueryData.colors && filterQueryData.colors.length > 0){
          filterQueryData['colors'] = { $in : filterQueryData['colors'] };
        }

        if(filterQueryData.hasOwnProperty("occasion") && filterQueryData.occasion && filterQueryData.occasion.length === 0){
          console.log('occasion came but, occasion is empty...');
          delete filterQueryData['occasion'];
        }else if(filterQueryData.hasOwnProperty("occasion") && filterQueryData.occasion && filterQueryData.occasion.length > 0){
          filterQueryData['occasion'] = { $in : filterQueryData['occasion'] };
        }

        if(filterQueryData.hasOwnProperty("sleeve") && filterQueryData.sleeve && filterQueryData.sleeve.length === 0){
          console.log('sleeve came but, sleeve is empty...');
          delete filterQueryData['sleeve'];
        }else if(filterQueryData.hasOwnProperty("sleeve") && filterQueryData.sleeve && filterQueryData.sleeve.length > 0){
          filterQueryData['sleeveLength'] = { $in : filterQueryData['sleeve'] };
          delete filterQueryData['sleeve'];
        }

        if(filterQueryData.hasOwnProperty("neck") && filterQueryData.neck && filterQueryData.neck.length === 0){
          console.log('neck came but, neck is empty...');
          delete filterQueryData['neck'];
        }else if(filterQueryData.hasOwnProperty("neck") && filterQueryData.neck && filterQueryData.neck.length > 0){
          filterQueryData['neck'] = { $in : filterQueryData['neck'] };
        }

        if(filterQueryData.hasOwnProperty("brand_id") && filterQueryData.brand_id && filterQueryData.brand_id.length === 0){
          console.log('neck came but, neck is empty...');
          delete filterQueryData['brand_id'];
        }else if(filterQueryData.hasOwnProperty("brand_id") && filterQueryData.brand_id && filterQueryData.brand_id.length > 0){
          filterQueryData['brand_id'] = { $in : filterQueryData['brand_id'] };
        }

        if(filterQueryData.hasOwnProperty("model_id") && filterQueryData.model_id && filterQueryData.model_id.length === 0){
          console.log('neck came but, neck is empty...');
          delete filterQueryData['model_id'];
        }else if(filterQueryData.hasOwnProperty("model_id") && filterQueryData.model_id && filterQueryData.model_id.length > 0){
          filterQueryData['model_id'] = { $in : filterQueryData['model_id'] };
        }

        if(filterQueryData.hasOwnProperty("finishing_id") && filterQueryData.finishing_id && filterQueryData.finishing_id.length === 0){
          console.log('neck came but, neck is empty...');
          delete filterQueryData['finishing_id'];
        }else if(filterQueryData.hasOwnProperty("finishing_id") && filterQueryData.finishing_id && filterQueryData.finishing_id.length > 0){
          filterQueryData['finishing_id'] = { $in : filterQueryData['finishing_id'] };
        }

        if(filterQueryData.hasOwnProperty("sizes") && !filterQueryData.sizes){
          console.log('sizes came but, sizes is empty...');
          delete filterQueryData['sizes'];
        }else if(filterQueryData.hasOwnProperty("sizes") && filterQueryData.sizes){
          filterQueryData['sizes'] = { $in : [filterQueryData['sizes']] };
        }

        if((filterQueryData.hasOwnProperty("minprice") && filterQueryData.minprice < 0) || (filterQueryData.hasOwnProperty("maxprice") && filterQueryData.maxprice < 0)){
          // console.log('sizes came but, sizes is empty...');
          console.log('deleting both price...', filterQueryData['minprice'], filterQueryData['maxprice']);
          delete filterQueryData['minprice'];
          delete filterQueryData['maxprice'];
        }else if(filterQueryData.hasOwnProperty("minprice") && filterQueryData.minprice > -1 && filterQueryData.hasOwnProperty("maxprice") && filterQueryData.maxprice > 0){
          filterQueryData['sellingPrice'] = { $gte : filterQueryData['minprice'], $lte : filterQueryData['maxprice'] };
          delete filterQueryData['minprice'];
          delete filterQueryData['maxprice'];
        }else{
          console.log('deleting both price... else');
          delete filterQueryData['minprice'];
          delete filterQueryData['maxprice'];
        }

        console.log('req.query     :  ', filterQueryData);

        // searching PRODUCT for that name
        const qr = await QUERY.findAllItemWithOffsetLimit(parseInt(offset), parseInt(limit), filterQueryData);
        if(qr && qr.length <= 0){
            //PRODUCT not exist
            RESPONCE.errorResponce(res, RESPONSE_MESSAGES.productNotFound, []);
        }else if(qr && qr.length > 0){
            // PRODUCT exist 
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.productFound, qr);
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
//  PRODUCT delete API
//-------------------------------------------------------------
router.patch('/delete', checkToken, async function(req, res, next) {
    try {
    
        const { id } = req.body;

        // searching PRODUCT for that ID
        const qr = await QUERY.findItem({_id: id});
        if(qr && qr.length <= 0){

          //PRODUCT not exist
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.productNotFound);
        }else if(qr && qr.length > 0){

          // PRODUCT exist 
          const result = await QUERY.updateItem(qr[0]._id, {is_deleted: true});
          if(result){
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.productDeleteSuccess);
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
//  PRODUCT IMAGE UPLOAD API
//-------------------------------------------------------------
router.post('/uploadProductImage/:id', checkToken, async function(req, res, next) {
  try {

      const ID = req.params.id;
      console.log('ID value    : ', ID);

      upload(req, res, (err) => {
        if (err) {
          RESPONCE.errorResponce(res, 'Image Not Uploaded');
        } else {

          if(req.files == undefined){
            RESPONCE.errorResponce(res, 'Image Not Found');
          }else if(req.files.length < 1){
            RESPONCE.errorResponce(res, 'Image Not Found');
          }else{
            // console.log('req.files       ', req.files);
              let filesArray = req.files;

              let imageNameArray = filesArray.map(file => file.filename);
              let promiseArray = createPromiseArray(imageNameArray);

              Promise.all(promiseArray).then(responce => { 

                // let firstImage = imageNameArray[0].split('.')[0];
                let featureImage = imageNameArray.filter((item, index) => {
                  if(item.includes('feature')){
                      return item;
                  }
                });

                let firstImage = featureImage[0].split('.')[0];

                imageNameArray.forEach((item, index)=>{
                  // if(index != 0){
                      let imageName = imageNameArray[index].split('.')[0];
                      // PROMISES_ARRAY.push(sharpStream.clone().resize({ width: 540 }).jpeg({ quality: 100 }).toFile(`${imageBasePath}/${imageName}_540_720_pd.jpg`));
                      cloudinary.uploader.upload(`./public/images/${imageName}_540_720_pd.jpg`, {public_id: `${imageName}_540_720_pd`});
                  // }
                });


                cloudinary.uploader.upload(`./public/images/${firstImage}_588_28.jpg`, {public_id: `${firstImage}_588_28`});
                cloudinary.uploader.upload(`./public/images/${firstImage}_546_26.jpg`, {public_id: `${firstImage}_546_26`});
                cloudinary.uploader.upload(`./public/images/${firstImage}_504_24.jpg`, {public_id: `${firstImage}_504_24`});
                cloudinary.uploader.upload(`./public/images/${firstImage}_462_22.jpg`, {public_id: `${firstImage}_462_22`});
                cloudinary.uploader.upload(`./public/images/${firstImage}_420_20.jpg`, {public_id: `${firstImage}_420_20`});
                cloudinary.uploader.upload(`./public/images/${firstImage}_378_18.jpg`, {public_id: `${firstImage}_378_18`});
                cloudinary.uploader.upload(`./public/images/${firstImage}_315_15.jpg`, {public_id: `${firstImage}_315_15`});
                cloudinary.uploader.upload(`./public/images/${firstImage}_210_10.jpg`, {public_id: `${firstImage}_210_10`}, async function (error, result) {
                    // RESPONCE.successResponce(res, 'Image Upload Successfully!');

                    let pdImagesArr = imageNameArray.map((item)=> {
                        let imageName = item.split('.')[0];
                        return `${imageName}_540_720_pd.jpg`;
                    });

                    const qr = await QUERY.findItem({_id: ID});

                    if(qr && qr.length <= 0){
                      //PRODUCT not exist
                      RESPONCE.errorResponce(res, 'Product not Uploaded');
                    }else if(qr && qr.length > 0){
                      // PRODUCT exist 

                      let updateData = {
                        productImage28: `${firstImage}_588_28.jpg`,
                        productImage26: `${firstImage}_546_26.jpg`,
                        productImage24: `${firstImage}_504_24.jpg`,
                        productImage22: `${firstImage}_462_22.jpg`,
                        productImage20: `${firstImage}_420_20.jpg`,
                        productImage18: `${firstImage}_378_18.jpg`,
                        productImage15: `${firstImage}_315_15.jpg`,
                        productImage10: `${firstImage}_210_10.jpg`,
                        productDetailsImages: pdImagesArr,
                      }

                      const result = await QUERY.updateItem(qr[0]._id, updateData);
                      if(result){
                        RESPONCE.successResponce(res, 'Product Created Successfully');
                      }
                      
                    }

                });

              }).catch(err => {

                console.error("Error processing files, let's clean it up", err);

              });
          }

          
        }
      });
      
  } catch (error) {
  
      // error response
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