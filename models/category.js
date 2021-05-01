const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const ObjectId = Schema.Types.ObjectId;


// user schema
const productCategorySchema = new Schema({
  name: { type: String, lowercase: true, required: true, unique: true, trim: true, minLength: 1, maxLength: 100, index: true },
  parent_id: { type: ObjectId,  ref: 'Category', required: false, default: null },
  lavel: { type: String, required: true, default: null, unique: false, trim: true, maxLength: 100 },  
  description: { type: String, required: false, trim: true, default: '', maxLength: 200 },  
  is_deleted: { type: Boolean, required: true, default: false },
  active: { type: Boolean, required: false, default: true }
}, { timestamps: true });



// exporting as the user model
module.exports = MONGOOSE.model('Category', productCategorySchema);