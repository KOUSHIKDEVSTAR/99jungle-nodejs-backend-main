const MONGOOSE = require('mongoose');

const TAGPRODUCTQUERY = {};

// model imports
const TAGPRODUCT = require('../../models/tag-product');



TAGPRODUCTQUERY.findItem = async (querydata) => {
    return await TAGPRODUCT.find(querydata).exec();
}
TAGPRODUCTQUERY.createItem = async (createdata) => {
    return await TAGPRODUCT.create(createdata);
}
TAGPRODUCTQUERY.createMultipleItem = async (createdata) => {
    return await TAGPRODUCT.insertMany(createdata);
}
TAGPRODUCTQUERY.deleteItem = async (id) => {
    return await TAGPRODUCT.findByIdAndDelete(id).exec();
}




module.exports = TAGPRODUCTQUERY;