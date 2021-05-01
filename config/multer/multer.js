const express = require('express');
const multer = require('multer');
const path = require('path');


//checkFileType function
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Sorry!!! Only images are allowed to upload.');
    }
}


//set storage and file name of uploads
const storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, cb) {
        let name = file.originalname;
        cb(null, name);
    }
});


//upload initialized
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).array('productImages', 12);


module.exports = { upload };


