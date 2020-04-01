const nodemailer = require("nodemailer");
const hbs = require("nodemailer-handlebars");
const info = require("./mass-email-distribution");
const cron=require('node-cron');
const Api=require('./app')
const fs = require("fs");

let vendor = [];
const log = console.log;

info.run();


// // Step 1
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shiva.v.s.ip@gmail.com",
    pass: "vidyasagar8977"
  }
});

// Step 2
transporter.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    viewPath: "./views/"
  })
);
fs.readFile("./dummy.json", (err, data) => {
  JSON.parse(data).map(val => {
    vendor.push(val.email);
    return vendor;
  });
  console.log(vendor);
}); //

async function runner() {
    
  var obj = await info.data;
  var replytoemail=await info.data.reply_to

  setTimeout(() => {
    console.log(obj.reply_to);
    
      let mailOptions = {
        from: obj.from_email,
        subject: obj.subject,
        html: { path: "http://localhost:3000/" },
        
        list: {
          unsubscribe: {
            url: "http://innova-path.com/"
          }
        },
        
        replyTo: replytoemail,
        inReplyTo:replytoemail,
      };
      if(obj.run_type==='TEST'){
          mailOptions.to=obj.test_email
          console.log('sending test email')
      }
      else{
        mailOptions.bcc=vendor;
      }
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          return log(err);
        }
        return log("Email sent!!!");
      });
    }, 20000);
  }
  
  
   
// Innovapath<engr1@innova-path.com></engr1@innova-path.com>
runner();

