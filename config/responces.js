const RESPONCE = {};


//-------------------------------------------------------------
//  success responce method
//-------------------------------------------------------------
RESPONCE.successResponce = async(res, msg = '', data = null, token = null, item='') => {
    let succresp = { 
        success: true, 
        msg: item ? item + ' ' + msg : msg, 
        statusCode: res.statusCode, 
        token, 
        data 
    };
    return res.status(200).send(succresp);
}



//-------------------------------------------------------------
//  failure responce method
//-------------------------------------------------------------
RESPONCE.errorResponce = async(res, msg, data = null, error = null,  item='') => {
    let errresp = { 
        success: false, 
        msg: item ? item + ' ' + msg : msg, 
        statusCode: res.statusCode, 
        data, 
        error 
    };
    return res.send(errresp);
}


module.exports = RESPONCE;