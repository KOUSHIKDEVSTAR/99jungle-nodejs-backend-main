const MODELQUERY = {};

// model imports
const MODEL = require('../../models/material');

// console.log(TAG);

MODELQUERY.findItem = async (querydata) => {
    return await MODEL.find(querydata).exec();
}



MODELQUERY.findItemByID = async (id) => {
    return await MODEL.findById(id).exec();
}



MODELQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }    
}



MODELQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await MODEL.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



MODELQUERY.createItem = async (createdata) => {
    return await MODEL.create(createdata);
}



MODELQUERY.updateItem = async (id, updatedata) => {
    return await MODEL.findByIdAndUpdate(id, updatedata).exec();
}



MODELQUERY.deleteItem = async (id) => {
    return await MODEL.findByIdAndDelete(id).exec();
}



module.exports = MODELQUERY;