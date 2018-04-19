'use strict';



let express = require('express');
let router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const data = require('../db/notes');
const simDB = require('../db/simDB');  
const notes = simDB.initialize(data);

router.get('/', (req, res, next) => {
  let {searchTerm} = req.query;
  console.log(searchTerm);
  
  notes.filter(searchTerm).then(list => {
    if (list) {
      res.json(list);
    } else {
      next();
    }
  }).catch(err => {
    next(err);
  });
});

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  notes.find(id).then(item => {
    if (item) {
      res.json(item);
    } else {
      next();
    }
  }).catch(err => {
    next(err);
  });
 
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  }); 
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.update(id,updateObj).then(item => {
    if (item && updateObj){
      res.json(item);
    } else {
      next();
    }
  }).catch(err => {
    next(err);
  });

});













router.post('/', (req,res,next) => {
  const {title,content} = req.body;
  const newItem ={title, content};
  if(!newItem.title ){
    const err = new Error(`Missing ${title} in request body`);
    err.status = 400;
    return next(err);
  }
  notes.create(newItem).then( item =>{
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  }).catch( err => {
    return next(err);
  });
});






router.delete('/:id', (req, res, next) => {
  notes.delete(req.params.id).then(()=>{
    if(req.params.id){
      res.status(204).end();
    } else {
      next();
    }
  }).catch(err => {
    res.status=500;
    next(err);
  });
   
   
   
    
});
  
  module.exports = router;