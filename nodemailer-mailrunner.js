const nodemailer = require("nodemailer");
const hbs = require("nodemailer-handlebars");
const info = require("./mass-email-distribution");
const fs = require("fs");

let list = [];
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
    list.push(val.email);
    return list;
  });
  console.log(list);
});
async function runner() {
  var obj = await info.data;
  setTimeout(() => {
    console.log(typeof obj.replyto);
    let mailOptions = {
      from: obj.from_email,
      to: "",
      bcc: obj.test_email,
      subject: obj.subject,
      html: { path: "http://localhost:3000/" },
      
      list: {
        unsubscribe: {
          url: "http://localhost:3000/"
        }
      },
      inReplyTo:'marketing@innova-path.com',
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return log(err);
      }
      return log("Email sent!!!");
    });
  }, 20000);
}
//  console.log(mailOptions)
// Innovapath<engr1@innova-path.com></engr1@innova-path.com>
runner();
// // Step 3
//
