const TAGQUERY = {};

// model imports
const TAG = require('../../models/tags');

// console.log(TAG);

TAGQUERY.findItem = async (querydata) => {
    return await TAG.find(querydata).exec();
}



TAGQUERY.findItemByID = async (id) => {
    return await TAG.findById(id).exec();
}



TAGQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await TAG.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await TAG.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }    
}



TAGQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await TAG.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



TAGQUERY.createItem = async (createdata) => {
    return await TAG.create(createdata);
}



TAGQUERY.updateItem = async (id, updatedata) => {
    return await TAG.findByIdAndUpdate(id, updatedata).exec();
}



TAGQUERY.deleteItem = async (id) => {
    return await TAG.findByIdAndDelete(id).exec();
}



module.exports = TAGQUERY;