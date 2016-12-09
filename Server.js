var express=require('express');
var nodemailer = require("nodemailer");
var app=express();

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/

var smtpTransport = nodemailer.createTransport("SMTP",{
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'medicare247blr@gmail.com',
        pass: 'medicare'
    },
    tls: {rejectUnauthorized: false},
    debug:true
});


/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

var callback = function(req,res){
    res.sendFile(__dirname+'/index.html');
};

app.get('/',callback);
app.use("/assets",express.static(__dirname + "/assets"));
app.get('/send',function(req,res){
	var mailOptions={
		to : req.query.to,
		subject : req.query.subject,
		text : req.query.text
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
		res.end("error");
	 }else{
        	console.log("Message sent: " + response.message);
		res.end("sent");
    	 }
});
});

/*--------------------Routing Over----------------------------*/

app.listen(process.env.PORT,function(){
	console.log("Express Started");
});