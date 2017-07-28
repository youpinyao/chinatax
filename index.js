const express = require('express');
const chalk = require('chalk');
const app = express();

const validCode = require('./routes/validCode.js');
const query = require('./routes/query.js');

app.use('/', express.static('static'));
app.use('/util', express.static('util'));
app.use('/modules', express.static('node_modules'));

validCode(app);
query(app);

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log();
  console.log(chalk.green('listening at http://%s:%s'), host, port);
  console.log();
});
