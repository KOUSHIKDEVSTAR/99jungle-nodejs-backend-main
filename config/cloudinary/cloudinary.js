const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'sushilmandi', 
    api_key: '885434559465986', 
    api_secret: 'GfUEGWyim3bLG5a_x1o5pqfzb_E', 
});

module.exports = {cloudinary};