var express = require('express');
var app     = express();

var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass',
  database: 'contacts'
});

app.listen(3000, function(){
   console.log('Running on port 3000!')
});

// used to serve static files from public directory
app.use(express.static('public'));

// test with curl 'http://localhost:3000/add?firstName=peter'

app.get('/add', function(req, res){
   console.log('Adding to database!');
   console.log(req.query);
   connection.query(
      `INSERT INTO \`contacts\` VALUES('${req.query.firstName}', '${req.query.lastName}', '${req.query.phoneNumber}', '${req.query.email}', '${req.query.university}', '${req.query.major}')`,
      function(err, results, fields) {
        console.log(results);
        res.send(results);
      }
    );
});

app.get('/random', function(req, res){
    console.log('Adding to database!');
    console.log(req.query);
    let firstNames = ['Bob', 'Kate', 'John', 'Sarah'];
    let lastNames = ['Johnson', 'Smith', 'Doe', 'Peters'];
    let emails = ['ght7@mit.edu', 'tyu89@mit.edu', 'orte45@mit.edu', 'wsax1@mit.edu'];
    let phoneNumber = '555-555-5555';
    let university = 'MIT';
    let major = 'MBA';

    var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    var lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    var email = emails[Math.floor(Math.random() * emails.length)];

    connection.query(
       `INSERT INTO \`contacts\` VALUES('${firstName}', '${lastName}', '${phoneNumber}', '${email}', '${university}', '${major}')`,
       function(err, results, fields) {
         console.log(results);
         res.send(results);
       }
     );
 });

app.get('/read', function(req, res){
    connection.query(
        'SELECT * FROM `contacts`',
        function(err, results, fields) {
          console.log(results);
          res.send(results);
        }
      );
 }); 