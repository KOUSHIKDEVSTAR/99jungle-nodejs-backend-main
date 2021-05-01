const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const ObjectId = Schema.Types.ObjectId;


// user schema
const categoryProductSchema = new Schema({
  category_id: { type: ObjectId,  ref: 'Category', required: true },  
  product_id: { type: ObjectId, ref: 'Product', required: true },  
  active: { type: Boolean, required: false, default: true }
}, { timestamps: true });



// exporting as the user model
module.exports = MONGOOSE.model('CategoryProduct', categoryProductSchema);