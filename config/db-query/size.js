const SIZEQUERY = {};

// model imports
const SIZE = require('../../models/size');

// console.log(SIZE);

SIZEQUERY.findItem = async (querydata) => {
    return await SIZE.find(querydata).exec();
}



SIZEQUERY.findItemByID = async (id) => {
    return await SIZE.findById(id).exec();
}



SIZEQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await SIZE.find(querydata).populate({path: 'product_type_id', populate: { path: 'category' }}).sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await SIZE.find(querydata).populate({path: 'product_type_id', populate: { path: 'category' }}).sort({ createdAt: 'desc'}).exec();
    }    
}



SIZEQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await SIZE.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



SIZEQUERY.createItem = async (createdata) => {
    return await SIZE.create(createdata);
}



SIZEQUERY.updateItem = async (id, updatedata) => {
    return await SIZE.findByIdAndUpdate(id, updatedata).exec();
}



SIZEQUERY.deleteItem = async (id) => {
    return await SIZE.findByIdAndDelete(id).exec();
}



module.exports = SIZEQUERY;