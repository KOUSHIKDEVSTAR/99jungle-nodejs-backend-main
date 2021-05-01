const MERCHANTQUERY = {};

// model imports
const MERCHANT = require('../../models/merchant');

// console.log(SIZE);

MERCHANTQUERY.findItem = async (querydata) => {
    return await MERCHANT.find(querydata).exec();
}



MERCHANTQUERY.findItemByID = async (id) => {
    return await MERCHANT.findById(id).exec();
}



MERCHANTQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await MERCHANT.find(querydata).sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await MERCHANT.find(querydata).sort({ createdAt: 'desc'}).exec();
    }    
}



MERCHANTQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await MERCHANT.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



MERCHANTQUERY.createItem = async (createdata) => {
    return await MERCHANT.create(createdata);
}



MERCHANTQUERY.updateItem = async (id, updatedata) => {
    return await MERCHANT.findByIdAndUpdate(id, updatedata).exec();
}


MERCHANTQUERY.deleteItem = async (id) => {
    return await MERCHANT.findByIdAndDelete(id).exec();
}



module.exports = MERCHANTQUERY;