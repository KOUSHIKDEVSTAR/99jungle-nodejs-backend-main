const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const ObjectId = Schema.Types.ObjectId;


// user schema
const MerchantSchema = new Schema({
  name: { type: String, lowercase: true, required: true, unique: true, trim: true, minLength: 1, maxLength: 100, index: true },  
  label: { type: String, lowercase: true, required: false, unique: false, trim: true, default: '' }, 
  uniqueCode: { type: String, required: true, unique: true, trim: true, minLength: 1, maxLength: 100 }, 
  description: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },  
  active: { type: Boolean, required: false, default: true },
  is_deleted: { type: Boolean, required: false, default: false }
}, { timestamps: true });



// exporting as the user model
module.exports = MONGOOSE.model('Merchant', MerchantSchema);