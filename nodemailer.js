const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const log = console.log;
const fs=require('fs');
 let list=[];


// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shiva.v.s.ip@gmail.com' , 
        pass: 'vidyasagar8977' }
});

// Step 2
transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
}));

// Step 3
fs.readFile('./dummy.json', (err,data)=>{
    (JSON.parse(data).map(val=>{
         list.push(val.email)
         return list;
     }))
     console.log(list);
})
let mailOptions = {
    from: 'shiva.v.s.ip@gmail.com', 
    to: '',
    bcc:list, 
    subject: 'Nodemailer - Test',
    html:({path:'http://localhost:3000/'}),
    list:{
    unsubscribe:{
        url:'http://localhost:3000/'
    }}
   
};

// Step 4
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log(err);
    }
    return log('Email sent!!!');
});