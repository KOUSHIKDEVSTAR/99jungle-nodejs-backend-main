const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const ObjectId = Schema.Types.ObjectId;

// user schema
const Product_Type_Schema = new Schema({
  name: { type: String, lowercase: true, required: true, unique: true, trim: true, minLength: 1, maxLength: 100, index: true },  
  lavel: { type: String, lowercase: true, required: true, unique: false, trim: true, minLength: 1, maxLength: 100 },  
  category: { type: ObjectId,  ref: 'Category', required: true },
  description: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },  
  active: { type: Boolean, required: false, default: true }, 
  is_deleted: { type: Boolean, required: false, default: false }
}, { timestamps: true });



// exporting as the user model
module.exports = MONGOOSE.model('ProductType', Product_Type_Schema);