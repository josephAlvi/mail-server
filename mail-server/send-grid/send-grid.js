var Client = require('node-rest-client').Client;
var apiUrl = 'https://api.sendgrid1.com/v3/mail/send';
var apiKey = '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';
var client = new Client();
var getEmailArrays = function (semiColonSeparatedList) {
    var listArray = semiColonSeparatedList ? semiColonSeparatedList.split(';') : [];
    var returnArray = [];
    for (var i = 0; i < listArray.length; i++) {
        returnArray.push({
            "email": listArray[i].trim()
        })
    }
    return returnArray;
}


var getPersonalizationArray = function (to, cc, bcc, emailSubject) {
    var personaliztionArray = [];
    var pesonalizationObject = {};
    pesonalizationObject.to = getEmailArrays(to);
    pesonalizationObject.subject = emailSubject;
    if (cc && cc.length > 0)
        pesonalizationObject.cc = getEmailArrays(cc);
    if (bcc && bcc.length > 0)
        pesonalizationObject.bcc = getEmailArrays(bcc);
    personaliztionArray.push(pesonalizationObject);

    return personaliztionArray;
}

var getMailArgs = function (toArray, ccArray, bccArray, emailSubject, emailFrom, emailBody) {
    var personalizations = getPersonalizationArray(toArray, ccArray, bccArray, emailSubject);
    var args = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
        },
        data: {
            "personalizations": personalizations,
            "from": {
                "email": emailFrom
            },
            "content": [{
                "type": "text/plain",
                "value": emailBody
            }]
        },
        // requestConfig: {
        //     timeout: 500
        // },
        // responseConfig: {
        //     timeout: 2000
        // }
    }
    return args;
};

var sendMail = function (mailParams, callback) {

    var args = getMailArgs(mailParams.to, mailParams.cc, mailParams.bcc, mailParams.emailSubject, mailParams.emailFrom, mailParams.emailBody);
    var req = client.post(apiUrl, args, function (data, response) {
        console.log(response.statusCode);
        var responseCode = '' + response.statusCode;
        if (responseCode.startsWith('2')) {
            callback(false, true)
        } else {
            callback({ message: 'Error ' + response.statusCode, detail: data.errors[0].message }, false)
        }
    }).on('error', function (err) {
        console.log('something went wrong on the request', err.request.options);
        callback({ message: '404', detail: 'Bad Request' }, false);
    });

    // req.on('requestTimeout', function (req) {
    //     console.log('request has expired');
    //     req.abort();
    //     callback({ message: '599', detail: 'Network Timeout' }, false)
    // });

    // req.on('responseTimeout', function (res) {
    //     console.log('response has expired');
    //     req.abort();
    //     callback({ message: '408', detail: 'Response Timeout' }, false)
    // });

};

module.exports = {
    sendMail: sendMail
};