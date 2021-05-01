const TEMPLATEQUERY = {};

// model imports
const TEMPLATE = require('../../models/email-template');

// console.log(TAG);

TEMPLATEQUERY.findItem = async (querydata) => {
    return await TEMPLATE.find(querydata).exec();
}



TEMPLATEQUERY.findItemByID = async (id) => {
    return await TEMPLATE.findById(id).exec();
}



TEMPLATEQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await TEMPLATE.find(querydata).sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await TEMPLATE.find(querydata).sort({ createdAt: 'desc'}).exec();
    }    
}



TEMPLATEQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await TEMPLATE.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



TEMPLATEQUERY.createItem = async (createdata) => {
    return await TEMPLATE.create(createdata);
}



TEMPLATEQUERY.updateItem = async (id, updatedata) => {
    return await TEMPLATE.findByIdAndUpdate(id, updatedata).exec();
}



TEMPLATEQUERY.deleteItem = async (id) => {
    return await TEMPLATE.findByIdAndDelete(id).exec();
}



module.exports = TEMPLATEQUERY;