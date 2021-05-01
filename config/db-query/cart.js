const CARTQUERY = {};

// model imports
const CART = require('../../models/cart');

// console.log(TAG);

CARTQUERY.findItem = async (querydata) => {
    return await CART.find(querydata).exec();
}



CARTQUERY.findItemByID = async (id) => {
    return await CART.findById(id).exec();
}



CARTQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await CART.find(querydata).sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await CART.find(querydata).sort({ createdAt: 'desc'}).exec();
    }    
}



CARTQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await CART.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



CARTQUERY.createItem = async (createdata) => {
    return await CART.create(createdata);
}



CARTQUERY.updateItem = async (id, updatedata) => {
    return await CART.findByIdAndUpdate(id, updatedata).exec();
}



CARTQUERY.deleteItem = async (id) => {
    return await CART.findByIdAndDelete(id).exec();
}



module.exports = CARTQUERY;