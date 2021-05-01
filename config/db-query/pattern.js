const PATTERNQUERY = {};

// model imports
const MODEL = require('../../models/pattern');

// console.log(TAG);

PATTERNQUERY.findItem = async (querydata) => {
    return await MODEL.find(querydata).exec();
}



PATTERNQUERY.findItemByID = async (id) => {
    return await MODEL.findById(id).exec();
}



PATTERNQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }    
}



PATTERNQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await MODEL.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



PATTERNQUERY.createItem = async (createdata) => {
    return await MODEL.create(createdata);
}



PATTERNQUERY.updateItem = async (id, updatedata) => {
    return await MODEL.findByIdAndUpdate(id, updatedata).exec();
}



PATTERNQUERY.deleteItem = async (id) => {
    return await MODEL.findByIdAndDelete(id).exec();
}



module.exports = PATTERNQUERY;