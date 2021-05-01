const PRODUCTTYPEQUERY = {};

// model imports
const MODEL = require('../../models/product-type');

// console.log(TAG);

PRODUCTTYPEQUERY.findItem = async (querydata) => {
    return await MODEL.find(querydata).exec();
}



PRODUCTTYPEQUERY.findItemByID = async (id) => {
    return await MODEL.findById(id).populate('category').exec();
}



PRODUCTTYPEQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await MODEL.find(querydata).populate('category').sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await MODEL.find(querydata).populate('category').sort({ createdAt: 'desc'}).exec();
    }    
}



PRODUCTTYPEQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await MODEL.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



PRODUCTTYPEQUERY.createItem = async (createdata) => {
    return await MODEL.create(createdata);
}



PRODUCTTYPEQUERY.updateItem = async (id, updatedata) => {
    return await MODEL.findByIdAndUpdate(id, updatedata).exec();
}



PRODUCTTYPEQUERY.deleteItem = async (id) => {
    return await MODEL.findByIdAndDelete(id).exec();
}



module.exports = PRODUCTTYPEQUERY;