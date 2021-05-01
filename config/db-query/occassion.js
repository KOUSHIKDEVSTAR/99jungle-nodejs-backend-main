const OCCASSIONQUERY = {};

// model imports
const MODEL = require('../../models/occassion');

// console.log(TAG);

OCCASSIONQUERY.findItem = async (querydata) => {
    return await MODEL.find(querydata).exec();
}



OCCASSIONQUERY.findItemByID = async (id) => {
    return await MODEL.findById(id).exec();
}



OCCASSIONQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }    
}



OCCASSIONQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await MODEL.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



OCCASSIONQUERY.createItem = async (createdata) => {
    return await MODEL.create(createdata);
}



OCCASSIONQUERY.updateItem = async (id, updatedata) => {
    return await MODEL.findByIdAndUpdate(id, updatedata).exec();
}



OCCASSIONQUERY.deleteItem = async (id) => {
    return await MODEL.findByIdAndDelete(id).exec();
}



module.exports = OCCASSIONQUERY;