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
  it('should return the corret note',function(){
    return chai.request(app)
      .get('/api/notes/4001')
      .then(function(res){
        expect(res).to.have.status(404);
              
      });
  });
});