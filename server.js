var express = require('express');
var bodyParser = require('body-parser')
var request = require('request');
var nodemailer = require('nodemailer');
var twilio = require('twilio');

var app = express();

// SMTP




app.use(bodyParser());      


// Email Blaster
app.post('/email_blaster', function(req, res){


	var messageBody = req.body.text;
	var sender = req.body.senderName + '<'+ req.body.senderEmail +'>';
	var subjectLine = req.body.subject;

	var recipients = eval(req.body.addressList);


	var transporter = nodemailer.createTransport({
	    service: req.body.senderService,
	    auth: {
	        user: req.body.senderEmail, // change this
	        pass: req.body.senderPassword // change this as well
	    }
	});


	for (var user = 0; user < recipients.length; user++) {

		var mailOptions = {
		    from: sender, // sender address
		    to: recipients[user], // list of receivers
		    subject: subjectLine, // Subject line
		    text: messageBody
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        res.send(error);
		    }else{
		        console.log('Message sent: ' + info.response);
		        res.send('Message sent: ' + info.response);
		    }
		});
	}





});


// Simple request to send a single email
app.post('/send_email', function(req, res){


	var messageBody = req.body.text;
	var sender = req.body.senderName + '<'+ req.body.senderEmail +'>';
	var subjectLine = req.body.subject;

	var recipient = req.body.address;


	var transporter = nodemailer.createTransport({
	    service: req.body.senderService,
	    auth: {
	        user: req.body.senderEmail, // change this
	        pass: req.body.senderPassword // change this as well
	    }
	});



		var mailOptions = {
		    from: sender, // sender address
		    to: recipient, // list of receivers
		    subject: subjectLine, // Subject line
		    text: messageBody
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        res.send(error);
		    }else{
		        console.log('Message sent: ' + info.response);
		        res.send('Message sent: ' + info.response);
		    }
		});


});








app.listen(31415);