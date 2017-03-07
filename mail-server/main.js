var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sendGrid = require('./send-grid/send-grid');
var mailGun = require('./mail-gun/mail-gun');

var port = process.env.PORT || 3100;
var preferredMailService = 'sendGrid';
var router = express.Router();

var viaSendGrid = function (reqObj, onSuccess, onError) {
    console.log('inside viaSendGrid');
    var mailParams = {};
    mailParams.to = reqObj.to ? reqObj.to : [];
    mailParams.cc = reqObj.cc ? reqObj.cc : [];
    mailParams.bcc = reqObj.bcc ? reqObj.bcc : [];
    mailParams.emailSubject = reqObj.subject;
    mailParams.emailFrom = reqObj.from;
    mailParams.emailBody = reqObj.body;
    sendGrid.sendMail(mailParams, function (err, data) {
        if (!err) {
            onSuccess(data);
        } else {
            onError(err);
        }
    });
};

var viaMailGun = function (reqObj, onSuccess, onError) {
    console.log('inside viaMailGun');
    mailGun.sendMail(reqObj, function (err, data) {
        if (!err) {
            onSuccess(data);
        } else {
            onError(err);
        }
    });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router.use(function (req, resp, next) {
    console.log('Request received');
    next();
});

router.get('/', function (req, res) {
    res.json({ message: 'Hooray! Welcome to mail-server' });
});

router.route('/Mail')
    .post(function (req, res) {
        console.log('preferredMailService = ' + preferredMailService);
        if (preferredMailService == 'sendGrid') {
            viaSendGrid(req.body, function (data) {
                res.json({ message: "Success", detail: "Email Sent Successfully" });
            }, function (err) {
                viaMailGun(req.body, function (data) {
                    preferredMailService = "mailGun";
                    res.json({ message: "Success", detail: "Email Sent Successfully" });
                }, function (err) {
                    res.json({ message: err.message, detail: err.detail });
                });
            });
        }
        else if (preferredMailService == 'mailGun') {
            viaMailGun(req.body, function (data) {
                res.json({ message: "Success", detail: "Email Sent Successfully" });
            }, function (err) {
                viaSendGrid(req.body, function (data) {
                    preferredMailService = "sendGrid";
                    res.json({ message: "Success", detail: "Email Sent Successfully" });
                }, function (err) {
                    res.json({ message: err.message, detail: err.detail });
                });
            });
        }
    });


app.use('/', router);

app.listen(port);
console.log('Magic happening on port ' + port);

