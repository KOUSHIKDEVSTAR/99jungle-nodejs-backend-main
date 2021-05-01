const QUERY = {};

// model imports
const CATEGORY = require('../../models/category');

// console.log(CATEGORY);

QUERY.findItem = async (querydata) => {
    return await CATEGORY.find(querydata).exec();
}


QUERY.findItemByID = async (id) => {
    return await CATEGORY.findById(id).exec();
}


QUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await CATEGORY.find(querydata).sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await CATEGORY.find(querydata).populate('parent_id').sort({ createdAt: 'desc'}).exec();
    }
    
}


QUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await CATEGORY.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}


QUERY.createItem = async (createdata) => {
    return await CATEGORY.create(createdata);
}


QUERY.updateItem = async (id, updatedata) => {
    return await CATEGORY.findByIdAndUpdate(id, updatedata).exec();
}


QUERY.deleteItem = async (id) => {
    return await CATEGORY.findByIdAndDelete(id).exec();
}


module.exports = QUERY;