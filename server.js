'use strict';

const data = require('./db/notes');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/notes/:id', (req,res) => {
  console.info(req.params);
  let id = Number(req.params.id);
  let item = data.find(item => item.id === id);
  res.json(item);
  console.info(id);
});


app.get('/api/notes', (req, res) => {
  let searchTerm = req.query.searchTerm;
  let itemsToReturn = data.filter(item => item.title.includes(searchTerm));
  
  res.json(itemsToReturn);
  
});

app.listen(8080,function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error',error => {
  console.error(error);
});

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
