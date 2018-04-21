'use strict';

const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
const chaiHttp = require('chai-http');


chai.use(chaiHttp);


describe('Reality check', function(){
  it('true should be true', function(){
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function(){
    expect(2+2).to.equal(4);
  });
});



// describe('Noteful App', function () {

//   let server;
//   before(function () {
//     return app.startServer()
//       .then(instance => server = instance);
//   });

//   after(function () {
//     return app.stopServer();
//   });




  describe('Express static', function () {
    it('GET request "/" should return the index page', function () {
      return chai.request(app)
        .get('/')
        .then(function (res){
          expect(res).to.exist;
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        
        });
    });
  });

  describe('404 handler', function (){
  
    it('should respond with 404 when given a bad path', function(){
      return chai.request(app)
        .get('/does/not/exist')
        .then(res => {
          expect(res).to.have.status(404);
        });
    });
  });


  describe('GET all notes', function(){

    it('should return all notes',function(){
      return chai.request(app)
        .get('/api/notes')
        .then(function(res) {
          expect(res.body).to.have.lengthOf(10);
          res.body.forEach(function(item){
            expect(item).to.have.all.keys('id','title','content');

          });

        });
    });

    it('should respond with a 404 for an invalid id', function () {
      return chai.request(app)
        .get('/api/notes/DOESNOTEXIST')
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });


  });

  describe('GET note by search term', function(){
    it('should return a list based on search term',function(){
      return chai.request(app)
        .get('/api/notes/?searchTerm=cats')
        .then(function(res){
          expect(res).to.have.status(200);
        });
    });

  });
  describe('GET note by search term', function(){
    it('should return an error ',function(){
      return chai.request(app)
        .get('/api/notes/?searchTerm=pudddingpie')
        .then(function(res){
          expect(res.body).to.have.lengthOf(0);
        });
    });

  });





  describe('GET note by ID',function(){
    it('should return the corret note',function(){
      return chai.request(app)
        .get('/api/notes/1001')
        .then(function(res){
          expect(res).to.have.status(200);
          expect(res.body).to.have.all.keys('id','title','content');
          expect(res.body.id).to.equal(1001);
        });
    });
  });

  describe('GET note by ID',function(){
    it('should return the error 404',function(){
      return chai.request(app)
        .get('/api/notes/4001')
        .catch(err => err.response)
        .then(function(res){
          expect(res).to.have.status(404);
              
        });
    });
  });
  //end of GET tests//with Heroku added

  describe('POST a note',function(){
    it('Should post a note',function(){
      const newItem = {
        'title': 'Something other than cats',
        'content': 'DOGS,DOGS,DOGS'
      };

      return chai.request(app)
        .post('/api/notes/')
        .send(newItem)
        .then(function(res){
          expect(res).to.have.status(201);
          expect(res).to.have.header('location');
          expect(res).to.be.an('object');
          expect(res.body).to.have.all.keys('title','content','id');
          expect(res.body.title).to.equal(newItem.title);
       
        });
    });
  });

  describe('Make sure POST has a title',function(){
    it('Should return missing title in request body',function(){
      let newItem = {
        content:'Dogs,Dogs,Dogs'
      };
      return chai.request(app)
        .post('/api/notes/')
        .send(newItem)
        .then(function(res){
          expect(res).to.have.status(400);
          expect(res.body.message).contains('Missing title in request body');
          expect(res).to.be.an('object');
        });
    });
  });

  describe('Changes note by ID',function(){
    it('Should update note by ID',function(){
      let newItem = {
        id:1001,
        title:'dogs',
        content:'something'
      };
      return chai.request(app)
        .put(`/api/notes/${newItem.id}`)
        .send(newItem)
        .then(function(res){
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys('id','title','content');
          expect(res.body.id).to.equal(parseInt(newItem.id));
        });
    });
  });

  describe('No ID in req', function(){
  
    it('Should return a 404 from an invalid ID', function(){
      let newItem = {
        id:1015,
        title:'dogs',
        content:'something'
      };
    
      return chai.request(app)
        .put(`/api/notes/${newItem.id}`)
        .send(newItem)
        .catch(err => err.response)
        .then(function(res){
          expect(res).to.have.status(404);
        });
    });

    it('Should return a message ""Missing title',function(){
      let newItem = {
        id:1015,
     
        content:'something'
      };
      return chai.request(app)
        .put(`/api/notes/${newItem.id}`)
        .send(newItem)
        .catch(err => err.response)
        .then(function(res){
          expect(res).to.have.status(400);
          expect(res.body.message).to.contain('Missing `title` in request body');
        });

    });
  });



  describe('DELETE item by ID', function(){
    it('should delete item by id', function(){
      return chai.request(app)
        .delete('/api/notes/1001')
        .then(function(res){
          expect(res).to.have.status(204);
        });
    });
  });















//});
