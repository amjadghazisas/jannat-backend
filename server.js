const express = require('express');

const OTPService = require('./service/OTPService.js');//

const hbs = require('hbs');

hbs.registerPartials(__dirname+'/views/partials');
//Make new express app//
var app = express();

app.use(express.static(__dirname+'/public'));

const port = process.env.PORT || 2300;//

//call back when route changes
app.use((req, res, next)=>{

    console.log(req.url + req.method);
    next();
});

app.set({'view engine':'hbs'});
app.get('/about',(req, res) => {

    //send html data back
    res.render('about.hbs',{title:'About Page!!!!!'});
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
    res.send("<h1>Login..!!</h1>  ");
});

app.get('/generateOTP',(req, res) => {

    OTPService.generateOTP();

    res.send("success");
});

app.listen(port,() => {

    console.log("Running at port "+port);
});