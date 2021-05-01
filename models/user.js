const MONGOOSE = require('mongoose');
var bcrypt = require('bcryptjs');
const ROLE = require('./roles');
const { generateRandomNumber } = require('../helpers/commonHelperMethods');
const { Schema } = MONGOOSE;
const ObjectId = Schema.Types.ObjectId;

// user schema define
const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    minLength: 1,
    maxLength: 60,
    index: true
  },

  phone: { type: String, required: false, trim: true, maxlength: 10, default: null, index: false },

  f_name: { type: String,  required: true, unique: false, trim: true, minlength: 2, maxlength: 50 },

  user_otp: { type: String,  required: false, unique: false, trim: true, minlength: 6, maxlength: 6, default: null },

  role_type: { type: String,  required: true, unique: false, trim: true },

  m_name: { type: String,  required: false, unique: false, trim: true, minlength: 0, maxlength: 50, default: null },

  l_name: { type: String,  required: false, unique: false, trim: true, minlength: 0, maxlength: 50,  default: null },

  password: { type: String,  required: true, unique: false, trim: true, minlength: 4, maxlength: 25 },

  role: { type: ObjectId,  ref: 'Role' },

  address1:  { type: String,  required: false, unique: false, trim: true, maxlength: 100, default: null},

  address2:  { type: String,  required: false, unique: false, trim: true, maxlength: 100, default: null },

  suburb:  { type: String,  required: false, unique: false, trim: true, maxlength: 50, default: null },

  state:  { type: String,  required: false, unique: false, trim: true, maxlength: 50, default: null },

  post_code:  { type: String,  required: false, unique: false, trim: true, maxlength: 6, default: null },

  username:  { type: String,  required: false, unique: false, trim: true, maxlength: 30, default: null },

  ip:  { type: String,  required: false, unique: false, trim: true, maxlength: 100, default: null },
  default_city:  { type: String,  required: false, unique: false, trim: true, maxlength: 100, default: null },
  default_country:  { type: String,  required: false, unique: false, trim: true, maxlength: 100, default: null },
  default_loc:  { type: String,  required: false, unique: false, trim: true, maxlength: 100, default: null },
  default_internet_org:  { type: String,  required: false, unique: false, trim: true, maxlength: 100, default: null },
  default_postal:  { type: String,  required: false, unique: false, trim: true, maxlength: 100, default: null },
  default_region:  { type: String,  required: false, unique: false, trim: true, maxlength: 100, default: null },
  default_timezone:  { type: String,  required: false, unique: false, trim: true, maxlength: 100, default: null },

  verified:  { type: Boolean,  required: false, unique: false, default: false },

  is_deleted: { type: Boolean, required: false, default: false },

  active: { type: Boolean, required: false, default: true }
}, { timestamps: true });


// userSchema pre save methods 
userSchema.pre('save', async function(next) {
  // generating otp
  this.user_otp = await generateRandomNumber(6);
  this.verified = false;
  this.username = this.email;

  // hashing the user password 
  if (this.password){
    var salt = bcrypt.genSaltSync(5);
    var hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }
  next();
});


// exporting as the user model
module.exports = MONGOOSE.model('User', userSchema);