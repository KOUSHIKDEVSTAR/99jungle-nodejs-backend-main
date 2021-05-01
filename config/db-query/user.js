const MONGOOSE = require('mongoose');
const QUERY_USERS = {};

// model imports
const USER = require('../../models/user');

// console.log(USER);

QUERY_USERS.findItemFromUserDB = async (querydata) => {
    return await USER.find(querydata).populate('role').exec();
}


QUERY_USERS.createItemForUserDB = async (createdata) => {
    return await USER.create(createdata);
}


QUERY_USERS.updateItemForUserTable = async (id, updatedata) => {
    return await USER.findByIdAndUpdate(id, updatedata).exec();
}

QUERY_USERS.findAllItem = async (querydata={}) => {
    
    querydata['is_deleted'] = false;
    querydata['role_type'] = "2";

    return await USER.find(querydata).sort({ createdAt: 'desc'}).exec();   
}


QUERY_USERS.findItemByID = async (id) => {
    // console.log('id  ', id);
    let ID = new MONGOOSE.Types.ObjectId(id);
    // console.log('objectID  ', productID);
    return new Promise((resolve, reject)=> {
        USER.findById(ID)
        .exec((err, data)=>{
            if(err){
                reject(err)
            }
            resolve(data);
        })
    });    
}


QUERY_USERS.updateItem = async (id, updatedata) => {
    return await USER.findByIdAndUpdate(id, updatedata).exec();
}


QUERY_USERS.deleteItem = async (id) => {
    return await USER.findByIdAndDelete(id).exec();
}


module.exports = QUERY_USERS;