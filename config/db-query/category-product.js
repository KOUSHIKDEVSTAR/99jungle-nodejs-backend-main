const MONGOOSE = require('mongoose');

const CATEGORYPRODUCTQUERY = {};

// model imports
const CATEGORYPRODUCT = require('../../models/category-product');



CATEGORYPRODUCTQUERY.findItem = async (querydata) => {
    return await CATEGORYPRODUCT.find(querydata).exec();
}
CATEGORYPRODUCTQUERY.createItem = async (createdata) => {
    return await CATEGORYPRODUCT.create(createdata);
}
CATEGORYPRODUCTQUERY.createMultipleItem = async (createdata) => {
    return await CATEGORYPRODUCT.insertMany(createdata);
}

CATEGORYPRODUCTQUERY.deleteItem = async (id) => {
    return await CATEGORYPRODUCT.findByIdAndDelete(id).exec();
}




module.exports = CATEGORYPRODUCTQUERY;