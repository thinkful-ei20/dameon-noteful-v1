'use strict';

const express = require('express');
// const data = require('./db/notes');
// const simDB = require('./db/simDB');  
// const notes = simDB.initialize(data); 
const {PORT} = require('./config');

const app = express();
const notesRouter = require('./router/notes.router');
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use('/api/notes',notesRouter);


// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Catch-all Error handler
// NOTE: we'll prevent stacktrace leak in later exercise
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


// Listen for incoming connections
if (require.main === module) {app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
}
module.exports = app;
console.log('Hello Noteful!');

'use strict';


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

// app.use(express.json())


// app.post('/todos', (req, res) => {

//   const status = validateTodo(req.body); // fn not shown

//   if (!status.isValid) {
//     const message = `Missing \`${status.error}\` in request body`
//     return res.status(422).send(message);
//   }

//   const item = Todo.create(req.body.title, req.body.content);

//   res.location(`/todos/${item.id}`).status(201).json(item);
// });
// app.use(express.json())


// app.put('/todos/:id', (req, res) => {

//   const status = validateTodo(req.body); // fn not shown

//   if (!status.isValid) {
//     const message = `Missing \`${status.error}\` in request body`
//     return res.status(422).send(message);
//   }

//   const updatedItem = Todo.update({
//     id: req.params.id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   res.status(200).json(updatedItem);
// });
// app.delete('/todos/:id', (req, res) => {
//   Todo.delete(req.params.id);
//   res.status(204).end();
// });
