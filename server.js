'use strict';

const express = require('express');
const data = require('./db/notes');
const simDB = require('./db/simDB');  
const notes = simDB.initialize(data); 
const {PORT} = require('./config');
const {logger} = require('./middleware/logger.js');
const app = express();



app.use(express.static('public'));
app.use(logger);




app.get('/api/notes', (req, res, next) => {
  let {searchTerm} = req.query;
  console.log(searchTerm);
  
  notes.filter(searchTerm, (err,list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });


});

app.get('/api/notes/:id', (req, res, next) => {
  const {id} = req.params;
  
  notes.find(id, (err, item) => {
    if (err) {
      return next(err);
    }
    return res.json(item);
  });
  
  

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

