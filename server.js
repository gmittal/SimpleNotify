var express = require('express');
var bodyParser = require('body-parser')
var request = require('request');
var nodemailer = require('nodemailer');
var twilio = require('twilio');

var app = express();

// SMTP
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'pinpoint.smtp@gmail.com', // change this
        pass: 'PinpointServer' // change this as well
    }
});



// app.use(express.bodyParser());
app.use(bodyParser());       // to support JSON-encoded bodies
// app.use( express.urlencoded() ); // to support URL-encoded bodies

app.all('/', function(req, res){
	// console.log(req.body);



});



function sendEmail(email, msgBody) {
	var mailOptions = {
	    from: 'Pinpoint <no-reply@gmail.com>', // sender address
	    to: email, // list of receivers
	    subject: 'Pinpoint: Somebody Has Shared Their Location With You', // Subject line
	    text: msgBody
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});
}




app.listen(31415);