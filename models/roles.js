const MONGOOSE = require('mongoose');
const { Schema } = MONGOOSE;

// role schema
const roleSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    minLength: 1,
    maxLength: 20
  },
  role_type: {
    type: Number,
    required: true,
    unique: true
  },
  active: { type: Boolean, required: false, default: true },
  is_deleted: { type: Boolean, required: false, default: false },
}, { timestamps: true });


// exporting as the role model
module.exports = MONGOOSE.model('Role', roleSchema);




// title:  String, // String is shorthand for {type: String}
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }