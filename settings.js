const APIServerPort = 3000;
const APIUrl = 'http://localhost:4200'; 
const database = {
  host: 'localhost',
  port: 3306,
  user: 'kobitara_todoapp',
  password: 'gopi123456',
  database: 'kobitara_to_do_app'
};

module.exports = {
  APIServerPort,
  database,
  APIUrl
};