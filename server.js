const express = require('express');

const OTPService = require('./service/OTPService.js');//


//Make new express app//
var app = express();

app.use(express.static(__dirname+'/public'));

const port = process.env.PORT || 2300;//

//The middleware is not called for root path
app.use((req, res, next)=>{

    console.log(req.url + req.method);
    next();
});

app.get('/',(req, res) => {

    //send html data back
    //res.send("<h1>Hello jannat...</h1>  ");

    //send json data back
    res.send({

        name:'Amjad',
        address:'Pune'
    });

});

app.get('/login',(req, res) => {

    //send html data back
    res.send("<h1>Login..</h1>  ");
});

app.get('/generateOTP',(req, res) => {

    OTPService.generateOTP();

    res.send("success");
});

app.listen(port,() => {

    console.log("Running at port "+port);
});