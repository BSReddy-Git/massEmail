const sql = require("mysql");
const fs = require("fs");

var vm = this;
const con = sql.createConnection({
  host: "mysql.whiteboxqa.com",
  user: "whiteboxqa",
  password: "Innovapath1",
  database: "whiteboxqa"
});
function emailDistribution(count, callback) {
  console.log("calling emailDistribution method");
  con.query(
    "select c.name, cm.currentlocation, cm.relocation, cm.intro from candidatemarketing cm, candidate c where cm.candidateid = c.candidateid and cm.`status` = '0-InProgress' and cm.priority ='P1'  and c.`status` in ('Marketing', 'Placed-Mkt') and LENGTH(cm.priority) > 0 and cm.relocation in ('Y','N') order by cm.priority desc LIMIT " +
      count,
    callback
  );
}

function emailProperties(callback) {
  console.info("calling emailProperties method");
  con.query("select * from massemailrun", callback);
}
module.exports = {
  run: function() {
    emailProperties((err, properties) => {
      if (err) {
        console.log(" error with the emailProperties", err);
      } else {
        console.log("getting data from massemailrun");
        properties.forEach((val, index) => {
          if (val.ipkey.toUpperCase() === "CANDIDATE_COUNT") {
            vm.candidateTotalCount = val.value;
          }
          if (val.ipkey.toUpperCase() === "SUBJECT") {
            vm.subject = val.value;
          }
          if (val.ipkey.toUpperCase() === "RUN_TYPE") {
            vm.run_type = val.value;
          }
          if (val.ipkey.toUpperCase() === "TEST_EMAIL") {
            vm.test_email = val.value;
          }
          if (val.ipkey.toUpperCase() === "FROM_EMAIL") {
            vm.from_email = val.value;
          }
          if (val.ipkey.toUpperCase() === "REPLY_TO") {
            vm.reply_to = val.value;
          }
          if (index === properties.length - 1) {
            emailDistribution(vm.candidateTotalCount, (err, candidate) => {
              if (err) {
                console.log("error from emaiDistributon");
              } else {
                console.log("getting candidate info from  active marketing");
                vm.candidateDetails = [];
                candidate.forEach(value => {
                  vm.candidateDetails.push(value);
                  // console.log(vm.candidateDetails);
                });
              }
            });
          }
        });
      }
    });
  },
  data: vm
};
