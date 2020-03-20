const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shiva.v.s.ip@gmail.com' , 
        pass: 'vidyasagar8977' 
});

// Step 2
transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
}));


// Step 3
let mailOptions = {
    from: 'shiva.v.s.ip@gmail.com', 
    to: 'b.skreddy1997@gmail.com', 
    subject: 'Nodemailer - Test',
    html:({path:'http://localhost:3000/'})
    // text: 'Innovapath',
    // template: 'index',
    // context: {
    //     name: 'Accime Esterling'
    // } 
};

// Step 4
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs');
    }
    return log('Email sent!!!');
});