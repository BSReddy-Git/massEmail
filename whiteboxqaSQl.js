const sql = require("mysql");
const fs = require("fs");

var val;
const con = sql.createConnection({
  host: "mysql.whiteboxqa.com",
  user: "whiteboxqa",
  password: "Innovapath1",
  database: "whiteboxqa"
});

con.connect(function(err) {
  if (err) throw err;
  con.query(
    "select c.name, cm.currentlocation, cm.relocation, cm.intro from candidatemarketing cm, candidate c where cm.candidateid = c.candidateid and cm.`status` = '0-InProgress' and cm.priority ='P1'  and c.`status` in ('Marketing', 'Placed-Mkt') and LENGTH(cm.priority) > 0 and cm.relocation in ('Y','N') order by cm.priority desc LIMIT 10",
    async (err, result) => {
      
      exports.val = await result;
    
    }
  );
  con.query("select email, remove from marketing_distribution_list where remove='N' ",
  async (err,emailsData)=>{
    
    fs.writeFile('emailsList.json', JSON.stringify(emailsData), (err,data)=>{
        if(err) throw err;
        console.log('Success');
    })
  })
});


