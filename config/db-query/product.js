const MONGOOSE = require('mongoose');

const PRODUCTQUERY = {};

// model imports
const PRODUCT = require('../../models/product');


// console.log(SIZE);
PRODUCTQUERY.findItem = async (querydata) => {
    return await PRODUCT.find(querydata).exec();
}



PRODUCTQUERY.findItemByID = async (id) => {
    // console.log('id  ', id);
    let productID = new MONGOOSE.Types.ObjectId(id);
    // console.log('objectID  ', productID);
    return new Promise((resolve, reject)=> {
        PRODUCT.findById(productID)
        .populate('category')
        .populate('colors')
        .populate('sizes')
        .populate('merchant')
        .populate('featureColor')
        .populate('brand_id')
        .populate('model_id')
        .populate('finishing_id')
        .populate('product_type_id')
        .populate('neck')
        .populate('occasion')
        .populate('sleeveLength')
        .exec((err, data)=>{
            if(err){
                reject(err)
            }
            resolve(data);
        })
    }); 
    
    // return await PRODUCT.findById(productID);
}



PRODUCTQUERY.findAllItem = async (querydata={}, populateCategory=false) => {
    querydata['is_deleted'] = false;
    if(!populateCategory){
        return await PRODUCT.find(querydata).sort({ createdAt: 'desc'}).exec();
    }else if(populateCategory){
        return await PRODUCT.find(querydata).populate('category').populate('merchant').sort({ createdAt: 'desc'}).exec();
    }    
}



PRODUCTQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {

    querydata['active']=true;
    querydata['is_deleted']=false; 

    return await PRODUCT.find(querydata).populate('category').populate('product_type_id').skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



PRODUCTQUERY.createItem = async (createdata) => {
    return await PRODUCT.create(createdata);
}



PRODUCTQUERY.updateItem = async (id, updatedata) => {
    return await PRODUCT.findByIdAndUpdate(id, updatedata).exec();
}



PRODUCTQUERY.deleteItem = async (id) => {
    return await PRODUCT.findByIdAndDelete(id).exec();
}



module.exports = PRODUCTQUERY;