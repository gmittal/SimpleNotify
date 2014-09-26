var express = require('express');
var bodyParser = require('body-parser')
var request = require('request');
var nodemailer = require('nodemailer');
var twilio = require('twilio');

var app = express();




app.use(bodyParser());      


// Email Blaster
app.post('/email_blaster', function(req, res){
/*
	Parameters inclue:
	senderEmail,
	subject,
	addressList (array),
	smtpUsername,
	smtpPassword,
	smtpServer,
	smtpPort,
	text

*/



	var messageBody = req.body.text
	// var messageBody = "yo";
	var sender = req.body.senderEmail;
	var subjectLine = req.body.subject;
	// console.log(JSON."'"+req.body.addressList+"'");

	console.log(req.body.addressList.toString());

	var recipients = eval(req.body.addressList);
	// console.log(recipients[0]);
	// console.log(JSON.parse(recipients));
	// var recipients = ["gautam@mittal.net"]; 


	for (var user = 0; user < recipients.length; user++) {

		// var messageBody = req.body.text;
		// var sender = req.body.senderEmail;
		// var sender = req.body.senderName + '<'+ req.body.senderEmail +'>';
		// var subjectLine = req.body.subject;

		// var recipient = req.body.address;


		var mailer   = require("mailer")
	    , username = req.body.smtpUsername
	    , password = req.body.smtpPassword;

		mailer.send(
			    { host:           req.body.smtpServer
				    , port:           req.body.smtpPort
				    , to:             recipients[user]
				    , from:           sender
				    , subject:        subjectLine
				    , body:           messageBody
				    , authentication: "login"
				    , username:       username
				    , password:       password
				    }, function(err, result){
				if(err){
				    console.log(err);
				}
			    }
			    );
	}

	res.send("Emails sent to " + JSON.stringify(recipients) + " at "+ new Date());





});


// Simple request to send a single email
app.post('/send_email', function(req, res){

	// params
	/*	
		senderEmail,
		subject,
		text,
		address,
		smtpUsername,
		smtpPassword,
		smtpServer,
		smtpPort,

	*/

	var messageBody = req.body.text;
	var sender = req.body.senderEmail;
	// var sender = req.body.senderName + '<'+ req.body.senderEmail +'>';
	var subjectLine = req.body.subject;

	var recipient = req.body.address;


	var mailer   = require("mailer")
    , username = req.body.smtpUsername
    , password = req.body.smtpPassword;

	mailer.send(
		    { host:           req.body.smtpServer
			    , port:           req.body.smtpPort
			    , to:             recipient
			    , from:           sender
			    , subject:        subjectLine
			    , body:           req.body.text
			    , authentication: "login"
			    , username:       username
			    , password:       password
			    }, function(err, result){
			if(err){
			    console.log(err);
			}
		    }
		    );

	res.send("The email was sent to " + recipient + " at " + new Date());

});





app.post('/sms_blaster', function(req, res){


	var messageBody = req.body.text;
	var sender = req.body.twilioNumber;
	// var subjectLine = req.body.subject;

	// var sid = req.body.twilioSID;
	// var token = req.body.twilioAuthToken;

	var client = require('twilio')(req.body.twilioSID, req.body.twilioAuthToken);

	var recipients = eval(req.body.recipientList);




	for (var user = 0; user < recipients.length; user++) {

		client.sendSMS({
		    to:recipients[user],
		    from:sender,
		    body:messageBody
		}, function(error, message) {
		    // The HTTP request to Twilio will run asynchronously. This callback
		    // function will be called when a response is received from Twilio
		    // The "error" variable will contain error information, if any.
		    // If the request was successful, this value will be "falsy"
		    if (!error) {
		        // The second argument to the callback will contain the information
		        // sent back by Twilio for the request. In this case, it is the
		        // information about the text messsage you just sent:
		        // res.send('Success! The SID for this SMS message is:');
		        // res.send(message.sid);
		 
		        console.log('Message sent on:');
		        console.log(message.dateCreated);
		        res.send('Message send to' + recipients[user]);
		    } else {
		        console.log('Oops! There was an error.');
		        res.send('Oops! There was an error.');
		        // res.send('')
		    }
		});

	}





});









app.listen(31415);