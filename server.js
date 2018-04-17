'use strict';

const express = require('express');
const data = require('./db/notes');
const {PORT} = require('./config');
const {logger} = require('./middleware/logger.js');
const app = express();



app.use(express.static('public'));
app.use(logger);




app.get('/api/notes', (req, res) => {
  let searchInput = req.query.searchTerm;

  //MENTOR SESSION: WHY DON'T I NEED TO RETURN?
  (!searchInput) ? res.json(data) : res.json(data.filter(items => items.title.includes(searchInput)));

});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const item= data.find(item => item.id === Number(id));
  console.log(id);
  return res.json(item);

});

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});



app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});





// Listen for incoming connections
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});





console.log('Hello Noteful!');


































// INSERT EXPRESS APP CODE HERE...
//--------------------------------------------------------------------
// const create = function() {
//   console.log('insert into database');
// };

// const read = function() {
//   console.log('read from database');
// };

// const update = function() {
//   console.log('update database');
// };

// const remove = function() {
//   console.log('remove from database');
// };

// module.exports = {create, read, update, remove};

// const {create, read, update, remove} = require('./models/storage');

// create();
// read();
// update();
// remove();
//----------------------------------------------------------------------------
// 'Access-Control-Allow-Origin', '*'
// 'Access-Control-Allow-Headers', 'Content-Type'
// 'Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE'
//---------------------------------------------------------------------------
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// });

