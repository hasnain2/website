var express = require('express');
var router = express.Router();

const stripe = require("stripe")("sk_test_51HUpQFGOKVBLZtqceQw6indhO04qiaUmQzwX3F7BfSRpDaKi5qfN1z11PvNpDBtPE59wpYuk9win4eD1NUTqvEGL00miuWpYBk");
const uuid = require("uuid/v4")
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/', function(req, res, next) {
    var token = req.body.token;
    const idempontencyKey = uuid();
    res.send('respond with a resource');
    return stripe.customers.create({
        email : 'mhasnainfaiz@gmail.com',
        source: token.id,    
    }).then(customer =>{
        stripe.charges.create({
            amount: 100*100,
            currency: 'usd',
            customer: '1234534435',
            receipt_email: 'mhasnainfaiz@gmail.com',
            description: 'this is the description of the product',

        }, {idempontencyKey})
    }).then(result => res.send(200).json(result))
    .catch(err => console.log(err));
  });

module.exports = router;