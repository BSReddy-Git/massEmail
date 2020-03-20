const app = require("express")();
var path = require("path");
const val = require('./whiteboxqaSQL.js');
const handlebars= require('express-handlebars');

//view engine setup
// app.set("views", path.join(__dirname, "views")); //setting views directory for views.
// app.set("view engine", "handlebars"); //setting view engine as handlebars


app.engine('handlebars', handlebars({
	defaultLayout: 'index',
	layoutsDir: path.join(__dirname, '/views/')
  }));
  app.set('views', path.join(__dirname, '/views/'));
  app.set('view engine', 'handlebars');

app.get("/", async (req, res) => {
	
	res.render("index", { people: await val  }); //passing list of people to our index.hbs file.
});
setTimeout(function(){
    console.log('students:',val);
},20000);
app.listen(3000);