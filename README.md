# mail-server
This service (backend + frontend) accepts the necessary information and sends emails. It provides an abstraction between two different email service providers. If one of the services goes down, your service can quickly failover to a different provider without affecting your customers.

Email Providers:

Mailgun
SendGrid

For demo purposes the required keys are hardcoded

Solution should cater for multiple email recipients, CCs and BCCs sepearted by ; but there is no support HTML email body types
BACKEND i.e mail-server
The backend implemented RESTful API call
- No authentication is required for the scope of this demo
- No client library used to integrate with Mailgun or Sendgrid (HTTP client of choice excepted)
- Built on Node js

FRONTEND i.e mailer
The frontend should be a Single page Web App (see technology constraints below). 
- The API credentials should not be leaked to the frontend
- There is no minify/uglify the JS code. 
- Most modern browsers (Chrome latest / FF latest / IE10+) should be supported
- Reasonable feedback to the user (in case of errors)
- Built on Ionic 2

# how to run mail-server backend
from the root of the git clone directory in terminal:
=> cd mail-server
=> npm install 
=> npm start

# how to run mailer frontend
from the root of the git clone directory in terminal:
=> cd mailer
=> npm install 
=> ionic serve

# requirements:
install following in order
1- node & npm (https://nodejs.org/en/download/)
2- cordova (npm install -g cordova)
3- ionic  (npm install -g ionic)


