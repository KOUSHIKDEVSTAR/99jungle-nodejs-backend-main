const SLEEVEQUERY = {};

// model imports
const MODEL = require('../../models/sleeve');

// console.log(TAG);

SLEEVEQUERY.findItem = async (querydata) => {
    return await MODEL.find(querydata).exec();
}



SLEEVEQUERY.findItemByID = async (id) => {
    return await MODEL.findById(id).exec();
}



SLEEVEQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent) {
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }else if(populateParent) {
        return await MODEL.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }    
}



SLEEVEQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await MODEL.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



SLEEVEQUERY.createItem = async (createdata) => {
    return await MODEL.create(createdata);
}



SLEEVEQUERY.updateItem = async (id, updatedata) => {
    return await MODEL.findByIdAndUpdate(id, updatedata).exec();
}



SLEEVEQUERY.deleteItem = async (id) => {
    return await MODEL.findByIdAndDelete(id).exec();
}



module.exports = SLEEVEQUERY;