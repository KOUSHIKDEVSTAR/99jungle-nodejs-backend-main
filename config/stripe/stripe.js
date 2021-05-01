const STATIC_VALUES = require("../staticValues");
const stripe = require("stripe")(STATIC_VALUES.stripeSecreteKey);

const STRIPE = {};

//-------------------------------------------------------------
//  stripe create customer api
//-------------------------------------------------------------
STRIPE.createCustomer = async (dataObject) => {
    try {
        const customer = await stripe.customers.create(dataObject);
        if(customer && customer.id){
            return { status: true, customer }
        }else{
            return { status: false, customer: null }
        }
    } catch (error) {
        return { status: false, customer: null }
    }    
}


//-------------------------------------------------------------
//  stripe create source api
//-------------------------------------------------------------
STRIPE.createSource = async (custID, token) => {
    try {
        const card = await stripe.customers.createSource(custID, {source: token});
        if(card && card.id){
            return { status: true, card }
        }else{
            return { status: false, card: null }
        }
    } catch (error) {
        return { status: false, card: null }
    }    
}


//-------------------------------------------------------------
//  stripe create charge api
//-------------------------------------------------------------
STRIPE.createCharge = async ({amount, currency, customer, description, capture}) => {
    try {
        const charge = await stripe.charges.create({ amount, currency, customer, description, capture });

        if(charge && charge.status === 'succeeded'){
            return { status: true, charge }
        }else{
            return { status: false, charge: null }
        }

    } catch (error) {
        return { status: false, charge: null }
    }    
}


//-------------------------------------------------------------
//  stripe capture charge api
//-------------------------------------------------------------
STRIPE.createChargeCapture = async ({charge_id}) => {
    try {
        const capture = await stripe.charges.capture(charge_id);

        if(capture) {
            return { status: true, charge }
        } else {
            return { status: false, charge: null }
        }

    } catch (error) {
        return { status: false, charge: null }
    }    
}


module.exports = STRIPE;







