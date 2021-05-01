const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const ObjectId = Schema.Types.ObjectId;

// model schema
const Model_Schema = new Schema({
  name: { type: String, lowercase: true, required: true, unique: true, trim: true, minLength: 1, maxLength: 100, index: true },  
  lavel: { type: String, lowercase: true, required: true, unique: false, trim: true, minLength: 1, maxLength: 100 }, 
  brand: { type: ObjectId,  ref: 'Brand', required: true }, 
  description: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },  
  active: { type: Boolean, required: false, default: true }, 
  is_deleted: { type: Boolean, required: false, default: false }
}, { timestamps: true });



// exporting as the phone model
module.exports = MONGOOSE.model('Model', Model_Schema);