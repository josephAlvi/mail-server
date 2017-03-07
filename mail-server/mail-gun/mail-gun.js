var Client = require('node-rest-client').Client;
var options = {
    user: "api",
    password: "key-4d10cc5ebe52f0c00a0b28ef3bd8ae89",
    // requestConfig: {
    //     timeout: 500
    // },
    // responseConfig: {
    //     timeout: 2000
    // }
};
var client = new Client(options)
var apiUrl = 'https://api.mailgun.net/v3/sandboxd9468f83d05f4e148e209e6f1ea543d1.mailgun.org/messages';


var getParamObj = function (mailParams) {
    var params = {};
    mailParams.from ? params.from = mailParams.from : 1 == 2;
    mailParams.to ? params.to = mailParams.to : 1 == 2;
    mailParams.subject ? params.subject = mailParams.subject : 1 == 2;
    mailParams.body ? params.text = mailParams.body : 1 == 2;
    mailParams.cc ? params.cc = mailParams.cc : 1 == 2;
    mailParams.bcc ? params.bcc = mailParams.bcc : 1 == 2;
    return params;
}

var sendMail = function (mailParams, callback) {

    var paramObj = getParamObj(mailParams);
    var args = {
        parameters: paramObj,
        headers: { "Content-Type": "application/json" }
    };
    var req = client.post(apiUrl, args, function (data, response) {
        console.log(response.statusCode);
        if (response.statusCode == '200') {
            callback(false, true)
        } else {
            callback({ message: 'Error ' + response.statusCode, detail: data.message }, false)
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

}

module.exports = {
    sendMail: sendMail
};

