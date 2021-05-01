const NECKQUERY = {};

// model imports
const MODEL = require('../../models/neck');

// console.log(TAG);

NECKQUERY.findItem = async (querydata) => {
    return await MODEL.find(querydata).exec();
}



NECKQUERY.findItemByID = async (id) => {
    return await MODEL.findById(id).exec();
}



NECKQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }    
}



NECKQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await MODEL.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



NECKQUERY.createItem = async (createdata) => {
    return await MODEL.create(createdata);
}



NECKQUERY.updateItem = async (id, updatedata) => {
    return await MODEL.findByIdAndUpdate(id, updatedata).exec();
}


NECKQUERY.deleteItem = async (id) => {
    return await MODEL.findByIdAndDelete(id).exec();
}



module.exports = NECKQUERY;