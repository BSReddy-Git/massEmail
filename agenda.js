const Agenda = require("agenda");
const mongoose = require("mongoose");

const mongo_connections = {
  dev: {
    mongo_host: "mongo.dev.talentscreen.io"
  },
  qa: {
    mongo_host: "mongo.qa.talentscreen.io"
  },
  stag: {
    mongo_host: "mongo.stag.talentscreen.io"
  },
  prod: {
    mongo_host: "mongo.echo.talentscreen.io" //working
  },
  mongo_port: "27017",
  user: "ipkumar",
  password: "kumarip131"
};
// async function run() {
//
//   const agenda = new Agenda ({db:{address :'mongodb+srv://ipkumar:kumarip131@mongo.echo.talentscreen.io/talent_ops',
// collection:'angendajobs'}})
//   agenda.define("testjob", () => {
//     console.log("hello ");
//     process.exit(0)
//   });

//   await new Promise(resolve=> agenda.once('ready', resolve));

//   agenda.schedule(new Date(Date.now()+1000),'testjob');
//   agenda.start()

// }
// run().catch(err=>{
//     console.log(err);
//     process.exit(-1)
// }
// );
var  d= new Date()
var time= d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
const mongoconection =
  "mongodb+srv://shiva:8977shiva@shivamongo-pmm8n.mongodb.net/shiva?retryWrites=true&w=majority";

const agenda = new Agenda({
  db: {
    address: mongoconection,
    collection: "agendajobs",
    option: { useUnifiedTopology: true }
  }
});

new Promise(resolve=> agenda.once('ready', resolve));

agenda.define("say hello", job => {
  console.log(time);
});

// (async function() {
//   await agenda.start();
//   // await agenda.every("one minute", "say hello");
//   await agenda.schedule(4/2/2020, 'say hello');
//   //repeatEvery
 
//   //  const Report= agenda.create('say hello');
//   //  await agenda.start();
//   //  await Report.repeatEvery('').save();


// })();


agenda.on('ready', ()=>{
  agenda.every(' one minute','say hello');
  agenda.start();
})
