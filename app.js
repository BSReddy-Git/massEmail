const app = require("express")();
var path = require("path");
// const val = require('./whiteboxqaSQL.js');
const handlebars= require('express-handlebars');
 const info= require('./mass-email-distribution');

//view engine setup
// app.set("views", path.join(__dirname, "views")); //setting views directory for views.
// app.set("view engine", "handlebars"); //setting view engine as handlebars
//  console.log(info.data)
info.run();
app.engine('handlebars', handlebars({
	defaultLayout: 'index',
	layoutsDir: path.join(__dirname, '/views/')
  }));
  app.set('views', path.join(__dirname, '/views/'));
  app.set('view engine', 'handlebars');

app.get("/", async (req, res) => {
  
	
	res.render("index", { people: await info.data.candidateDetails}); //passing list of people to our index.hbs file.
});

app.listen(3000);