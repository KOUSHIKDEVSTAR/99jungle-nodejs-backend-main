const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const ObjectId = Schema.Types.ObjectId;


// user schema
const tagProductSchema = new Schema({
  tag_id: { type: String, required: true, trim: true, lowercase: true },  
  product_id: { type: ObjectId, ref: 'Product', required: true },  
  active: { type: Boolean, required: false, default: true }
}, { timestamps: true });



// exporting as the user model
module.exports = MONGOOSE.model('TagProduct', tagProductSchema);