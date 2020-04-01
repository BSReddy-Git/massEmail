var mongoose = require("mongoose");

 


 const mongo_connections ={
    dev: {
      "mongo_host": "mongo.dev.talentscreen.io"
    },
    "qa": {
      "mongo_host": "mongo.qa.talentscreen.io"
    },
    "stag": {
      "mongo_host": "mongo.stag.talentscreen.io"
    },
    "prod": {
      "mongo_host": "mongo.echo.talentscreen.io" //working 
    },
    "mongo_port": "27017",
    "user": "ipkumar",
    "password": "kumarip131"
  }
// console.log( mongo_connections.prod);

 const db=mongoose.createConnection(
  "mongodb://" +
    mongo_connections.user +
    ":" +
    mongo_connections.password +
    "@" +
    mongo_connections.prod.mongo_host +
    "/" +'talent_ops', { useNewUrlParser: true } ,
    ()=>{
        console.log('connected')
    }
    
);

