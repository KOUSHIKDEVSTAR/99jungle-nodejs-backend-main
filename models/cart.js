const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;
const ObjectId = Schema.Types.ObjectId;


// user schema
const CartSchema = new Schema({
  product_id: { type: ObjectId, ref: 'Product', required: true, index: true },
  color_id: { type: ObjectId, ref: 'Color', required: true },
  qty: { type: String, required: true, unique: false, trim: true, default: '1' },
  title: { type: String, lowercase: true, required: true, unique: false, trim: true, maxLength: 300 },
}, { timestamps: true });



// exporting as the user model
module.exports = MONGOOSE.model('Cart', CartSchema);