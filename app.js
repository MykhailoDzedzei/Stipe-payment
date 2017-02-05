var express = require("express");
var stripe = require("stripe")("sk_test_5hIFN6lrgAVMCtMKd3FAs7ID");
var bodyParser = require("body-parser");
var ejs = require("ejs");


var app = express();


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function (req, res) {
    res.render("index", {});
});

app.post('/charge', function (req, res) {
    var token = req.body.stripeToken;
    var chargeAmount = req.body.chargeAmount;

    var charge = stripe.charges.create({
        amount: chargeAmount,
        currency: "usd",
        description: "Example charge",
        source: token
    }, function (err, charge) {
        if (err) {
            console.log(err)
        }
        res.render("success", {
            amount: chargeAmount,
            name: charge.source.name
        });
    });
})


app.listen(3000, function () {
    console.log('Приклад застосунку, який прослуховує 3000-ий порт!');
});