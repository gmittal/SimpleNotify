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