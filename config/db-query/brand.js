const BRANDQUERY = {};

// model imports
const MODEL = require('../../models/brand');

// console.log(TAG);

BRANDQUERY.findItem = async (querydata) => {
    return await MODEL.find(querydata).exec();
}



BRANDQUERY.findItemByID = async (id) => {
    return await MODEL.findById(id).exec();
}



BRANDQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }    
}



BRANDQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await MODEL.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



BRANDQUERY.createItem = async (createdata) => {
    return await MODEL.create(createdata);
}



BRANDQUERY.updateItem = async (id, updatedata) => {
    return await MODEL.findByIdAndUpdate(id, updatedata).exec();
}



BRANDQUERY.deleteItem = async (id) => {
    return await MODEL.findByIdAndDelete(id).exec();
}



module.exports = BRANDQUERY;