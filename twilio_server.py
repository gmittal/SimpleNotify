from flask import Flask, request, redirect

import twilio.twiml
from twilio.rest import TwilioRestClient

import requests

import urllib
import urllib2


# Find these values at https://twilio.com/user/account


app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'], endpoint="sms-route")
def index():
	account_sid = request.form["sid"];
	auth_token = request.form["token"];
	client = TwilioRestClient(account_sid, auth_token)

	client.messages.create(to=smsUsersArray[x], from_="+14806481956", body=messageString)
	return 'Sent SMS'


@app.route("/blast", methods=['GET', 'POST'])
def index():
	account_sid = request.form["sid"]
	auth_token = request.form["token"]

	recipients = eval(request.form["numbers"])

	client = TwilioRestClient(account_sid, auth_token)

	client.messages.create(to=smsUsersArray[x], from_="+14806481956", body=messageString)
	
	return 'Sent SMS'





if __name__ == "__main__":
    app.run(debug=True)
