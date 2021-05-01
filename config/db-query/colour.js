const COLOURQUERY = {};

// model imports
const COLOUR = require('../../models/colour');

// console.log(COLOUR);

COLOURQUERY.findItem = async (querydata) => {
    return await COLOUR.find(querydata).exec();
}



COLOURQUERY.findItemByID = async (id) => {
    return await COLOUR.findById(id).exec();
}



COLOURQUERY.findAllItem = async (querydata={}, populateParent=false) => {
    querydata['is_deleted'] = false;
    if(!populateParent){
        return await COLOUR.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }else if(populateParent){
        return await COLOUR.find(querydata).populate('product_type_id').sort({ createdAt: 'desc'}).exec();
    }    
}



COLOURQUERY.findAllItemWithOffsetLimit = async (offset, limit, querydata={}) => {
    return await COLOUR.findAll(querydata).skip(offset).limit(limit).sort({ createdAt: 'desc'}).exec();
}



COLOURQUERY.createItem = async (createdata) => {
    return await COLOUR.create(createdata);
}



COLOURQUERY.updateItem = async (id, updatedata) => {
    return await COLOUR.findByIdAndUpdate(id, updatedata).exec();
}



COLOURQUERY.deleteItem = async (id) => {
    return await COLOUR.findByIdAndDelete(id).exec();
}



module.exports = COLOURQUERY;