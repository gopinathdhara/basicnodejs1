const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const settings = require('./settings');
const routes = require('./routes');

const middlewares = require('./middlewares');


var cors = require('cors'); 
app.use(cors({credentials: true, origin: settings.APIUrl}));
app.use(function(req, res, next) {
  //res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,accesstoken,regenarate-token,Accept,enctype,contentType,processData,cache');
  res.setHeader('Access-Control-Expose-Headers','Content-Type,expire,Accept');
  next();
});

/*
const connection = mysql.createConnection(settings.database);
*/

// configure the app to use bodyParser()
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true  })); 
 

//my development
app.get('/', function (req, res) {  
  res.send('Welcome to Basic node express app !');  
});  
app.get('/viewtasklist', middlewares.getConnectionWithKnex,routes.task.listAllTasks);

 /*
 connection.connect(error => {
   if (error) {
     console.error(`Error connecting to database: ${error}`);
     return process.exit();
   }
   app.locals.connection = connection;
   app.listen(settings.APIServerPort , () => console.info(`API Server is running on ${settings.APIServerPort}`));
});*/

const knex = require('knex')({
  client: 'mysql',
  connection: settings.database
});
app.locals.knex = knex;
app.listen(process.env.PORT || settings.APIServerPort , () => console.info(`API Server is running on ${settings.APIServerPort}`));