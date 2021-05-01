const MONGOOSE = require('mongoose');
var bcrypt = require('bcryptjs');
const ROLE = require('./roles');
const { generateRandomNumber } = require('../helpers/commonHelperMethods');
const { Schema } = MONGOOSE;
const ObjectId = Schema.Types.ObjectId;


// product schema
const productSchema = new Schema({
  title: { type: String, lowercase: true, required: true, unique: true, trim: true, minLength: 1, maxLength: 200 },

  subTitle: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },

  manufacturerName: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },

  manufacturerBrand: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 100, default: null },

  mrp: { type: Number, required: true, unique: false, max: 9999, default: 0, min: 0 },

  discount: { type: Number, required: false, unique: false, max: 99, default: 0, min: 0 },

  discountUnit: { type: String, required: true, unique: false },

  sellingPrice: { type: Number, required: true, unique: false, max: 9999, default: 0, min: 0 },

  category: { type: ObjectId,  ref: 'Category', required: true },

  sizes: [{ type: ObjectId,  ref: 'Size', required: false }],

  colors: [{ type: ObjectId,  ref: 'Color', required: false }],

  featureColor: { type: ObjectId,  ref: 'Color', required: false },

  // tags: [{ type: ObjectId,  ref: 'Tag', required: false }],

  tags: [{ type: String, lowercase: true, required: false, trim: true }],

  merchant: { type: ObjectId,  ref: 'Merchant', required: true },

  material: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },

  sizeAndFit: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },

  washAndCare: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },

  fabric: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },

  fit: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },
  length: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },
  multipackSet: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },

  neck: { type: ObjectId,  ref: 'Neck' },
  occasion: { type: ObjectId,  ref: 'Occassion', required: false, default: null },
  pattern: { type: ObjectId,  ref: 'Pattern', required: false, default: null },
  sleeveLength: { type: ObjectId,  ref: 'Sleeve', required: false, default: null },
  brand_id: { type: ObjectId,  ref: 'Brand' },
  model_id: { type: ObjectId,  ref: 'Model' },
  material_id: { type: ObjectId,  ref: 'Material', required: false, default: null },
  finishing_id: { type: ObjectId,  ref: 'Finishing' },
  product_type_id: { type: ObjectId,  ref: 'ProductType' },

  ideal_for: { type: String, required: false, unique: false, trim: true, maxLength: 5, default: null },

  soldBy: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },

  description: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 500, default: null },

  metaTitle: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },

  productSellType: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 100, default: 'dropship' },

  metaKeywords: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 200, default: null },

  metaDescription: { type: String, lowercase: true, required: false, unique: false, trim: true, maxLength: 300, default: null },

  productImage28: { type: String, required: false, unique: false, trim: true, default: null },
  productImage26: { type: String, required: false, unique: false, trim: true, default: null },
  productImage24: { type: String, required: false, unique: false, trim: true, default: null },
  productImage22: { type: String, required: false, unique: false, trim: true, default: null },
  productImage20: { type: String, required: false, unique: false, trim: true, default: null },
  productImage18: { type: String, required: false, unique: false, trim: true, default: null },
  productImage15: { type: String, required: false, unique: false, trim: true, default: null },
  productImage10: { type: String, required: false, unique: false, trim: true, default: null },

  productDetailsImages: [{ type: String, required: false, unique: false, trim: true, default: null }],
  active: { type: Boolean, required: false, default: true },
  is_deleted: { type: Boolean, required: false, default: false },
  
}, { timestamps: true });




// exporting as the user model
module.exports = MONGOOSE.model('Product', productSchema);