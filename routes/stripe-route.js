var express = require('express');
const STRIPE = require('../config/stripe/stripe');
const DUMMY_DATA = require('../config/dummydata');
const RESPONCE = require('../config/responces');
var Sentry = require('@sentry/node');
var router = express.Router();




//-------------------------------------------------------------
//  stripe payment getting api
//-------------------------------------------------------------
router.post('/getpayment', async function(req, res, next) {
  const { customerStripeID, stripeToken, amount } = req.body; 
    
    try {
        if(!customerStripeID){
            const custData = { email: DUMMY_DATA.email, name: DUMMY_DATA.name, phone: DUMMY_DATA.phone }

           let customer = await STRIPE.createCustomer(custData);
           if(customer.status){
              let source = await STRIPE.createSource(customer.customer.id, stripeToken);
              if(source.status){
                const cd = {amount: amount*100, currency: 'usd', customer: customer.customer.id, description: 'creating charge', capture: true};
                let chargedata = await STRIPE.createCharge(cd);
                if(chargedata && chargedata.status){
                    RESPONCE.successResponce(res, 'Payment Successful', chargedata, null);
                }else{
                    Sentry.captureMessage(JSON.stringify(chargedata));
                    throw new Error('charge not created');
                }
              }else{
                Sentry.captureMessage(JSON.stringify(source));
                throw new Error('card not created');
              }
           }else{
            Sentry.captureMessage(JSON.stringify(customer));
            throw new Error('customer not created');
           }
        }else if(customerStripeID){
            const cd = {amount: amount*100, currency: 'usd', customer: customerStripeID, description: 'creating charge', capture: true};
            let chargedata = await STRIPE.createCharge(cd);
            if(chargedata && chargedata.status){
                RESPONCE.successResponce(res, 'Payment Successful', chargedata, null);
            }
        }
    } catch (error) {
        RESPONCE.errorResponce(res, 'Payment Not Completed', null, error);
    }  
});





module.exports = router;
