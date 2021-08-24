const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const nodemailer = require('nodemailer');


exports.sendEmail = functions.https.onRequest((request, response) => {
    console.log(request.body, '************');

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'appforservices@gmail.com',
            pass: 'Abcd@123456'
        }
    });

    var message = 'Hello, Welcome to App for Services.'
    var mailOptions = {
        from: 'appforservices@gmail.com',
        to: request.body.recepientEmail,
        cc: ["douglas.seitec@gmail.com"],

        subject: 'Welcome to App for Services',
        text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            response.json({ notSent: error });
        } else {
            console.log('Message sent: ' + info.response);
            response.json({ sent: info.response });
        };

    })

    // response.send("Hello from Firebase!");

});




exports.sendJobDataInEmailAPI = functions.https.onRequest((request, response) => {
    console.log(request.body, '************');

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'appforservices@gmail.com',
            pass: 'Abcd@123456'
        }
    });

    var message;
    if (request.body.jobData.type === 'Jobs' || request.body.jobData.type === 'Criar novos empregos') {
        message = `Hello,\n A new job has been created with following particulars: 
        Job Title: ${request.body.jobData.jobTitle},
        Job Status: ${request.body.jobData.status},
        Responsible Email: ${request.body.jobData.email},
        Responsible Name: ${request.body.jobData.responsibleName},
        Responsible Number: ${request.body.jobData.responsibleNumber},
        Job Contract Number: ${request.body.jobData.contractNoOfJob},
        Address: ${request.body.jobData.address},
        Start Date: ${request.body.jobData.begginingDate},
        Expirey Date: ${request.body.jobData.expTermDate},         
        Signature of Job Creator: ${request.body.jobData.image}`
    }
    else {
        console.log(request.body, '************');

        message = `Hello,\n A new administrative service has been created with following particulars: 
        Service Title: ${request.body.jobData.serTitle},
        Service Status: ${request.body.jobData.serStatus},
        Service Email: ${request.body.jobData.serEmail},
        Responsible Name: ${request.body.jobData.serResName},
        Responsible Number: ${request.body.jobData.serResNum},
        Signature of Serivce Creator: ${request.body.jobData.image}`
    }






    var mailOptions = {
        from: 'appforservices@gmail.com',
        to: request.body.recepientEmail,
        subject: 'Welcome to App for Services',
        text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            response.json({ notSent: error });
        } else {
            console.log('Message sent: ' + info.response);
            response.json({ sent: info.response });
        };

    })

    // response.send("Hello from Firebase!");

});




exports.sendPrDataInEmailAPI = functions.https.onRequest((request, response) => {
    console.log(request.body, 'prdataaaaaaaaaaaaa');

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'appforservices@gmail.com',
            pass: 'Abcd@123456'
        }
    });

    // ${prKeys[0]}: ${PRObj[prKeys[0]]},

    prKeys = []
    // message = `Hello,\n Testing`; 

    let PRObj = request.body.PrData
    console.log(PRObj, "llllllllllllll")
    for (var key in PRObj) {
        console.log(key, "asasasasas", PRObj[key])
        prKeys.push(key)
    }
    message = `Hello,\n A new pre-registraion has been created with following particulars:
    `;

    for (var i = 0; i < prKeys.length; i++) {

        message = `${message}
         ${prKeys[i]}: ${PRObj[prKeys[i]]}`


    }



    var mailOptions = {
        from: 'appforservices@gmail.com',
        to: request.body.recepientEmail,
        subject: 'Welcome to App for Services',
        text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            response.json({ notSent: error });
        } else {
            console.log('Message sent: ' + info.response);
            response.json({ sent: info.response });
        };

    })

    // response.send("Hello from Firebase!");

});




exports.sendReportDataInEmailAPI = functions.https.onRequest((request, response) => {
    console.log(request.body, '************');

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'appforservices@gmail.com',
            pass: 'Abcd@123456'
        }
    });


    // let PRObj = request.body.ReportData

    message = `Hello,\n A new report has been created with following particulars: 
        type: ${request.body.ReportData.type},
        Title: ${request.body.ReportData.title},
        name who reported: ${request.body.ReportData.name},
        image: ${request.body.ReportData.image},`
    // var message = 'Hello, Welcome to App for Services. Report'
    var mailOptions = {
        from: 'appforservices@gmail.com',
        to: request.body.recepientEmail,
        cc: [request.body.emailOfJob],
        subject: 'Welcome to App for Services',
        text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            response.json({ notSent: error });
        } else {
            console.log('Message sent: ' + info.response);
            response.json({ sent: info.response });
        };

    })

    // response.send("Hello from Firebase!");

});

