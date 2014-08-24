'use strict';

var modelBase = require('../mongocontroller/ModelBase.js');
var mongoose = require('mongoose');

//Create the schema to work
function PersonHelper(){
    this.documentDefinition = new mongoose.Schema({
        name:String,
        age: String              
    });
};

PersonHelper.prototype = new modelBase();

var helper = new PersonHelper();


describe('modelBase init',function(){
    
    // Code to Execute before the async spec
    beforeEach(function(done) {
        var resultCallback = function(obj){
            done();
            return obj;
        };
        helper.init(mongoose,"person", helper.documentDefinition,
                                                         resultCallback );
    });

    // verify init 
    it('Should return ok if init is {status:"ok"}',function() {
        expect(helper.dbStatus.status).toEqual("ok");
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });
});


describe('modelBase clear the collection',function(){
    var obj = {};
    obj.filter = {};
    // Code to Execute before the async spec
    beforeEach(function(done) {
        obj.callback = function(result){
            obj.result = result;
            done();
        };

        helper.removeWithFilter(obj);
    });

    // verify init 
    it('Should Remove all elements in the collection',function() {
        expect(obj.result.status).toEqual("ok");
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });

});

describe('modelBase save',function(){
    
    var obj = 
    {
        name:"Joe",
        age:"14"
    }

    // Code to Execute before the async spec
    beforeEach(function(done) {
        obj.callback = function(){
            done();
        };

        helper.save(obj);
    });

    // verify init 
    it('Should return ok if save is succesful {status:"ok"}',function() {
        expect(obj.result.status).toEqual("ok");
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });
});

describe('modelBase save',function(){
    
    var obj = 
    {
        name:"Mary",
        age:"19"
    }

    // Code to Execute before the async spec
    beforeEach(function(done) {
        obj.callback = function(){
            done();
        };

        helper.save(obj);
    });

    // verify init 
    it('Should return ok if save is succesful {status:"ok"}',function() {
        expect(obj.result.status).toEqual("ok");
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });
});



describe('modelBase get Joe',function(){
    var obj = {
        filter:{
            name:"Joe",
            age:"14"
        },
        params:{}
    }


    // Code to Execute before the async spec
    beforeEach(function(done) {
        obj.callback = function(result){
            obj.result = result;
            done();
        };

        helper.get(obj);
    });

    // verify init 
    it('Should return 1 person object with the data {name:Joe,age:14}',
        function() {
            expect(obj.result.length).toEqual(1);
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });
});


describe('modelBase get Mary',function(){
    var obj = {
        filter:{
            "name":"Mary",
            "age":"19"
        }
    }


    // Code to Execute before the async spec
    beforeEach(function(done) {
        obj.callback = function(result){
            obj.result = result;
            done();
        };

        helper.get(obj);
    });

    // verify init 
    it('Should return 1 person object with the data {name:Mary,age:19}',
        function() {
            expect(obj.result.length).toEqual(1);
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });

});


describe('modelBase get Carl',function(){
    var obj = {
        filter:{
            "name":"Carl",
            "age":"66"
        }
    }


    // Code to Execute before the async spec
    beforeEach(function(done) {
        obj.callback = function(result){
            obj.result = result;
            done();
        };

        helper.get(obj);
    });

    // verify init 
    it('Should return 0 person object with the data {name:Carl,age:66}',
        function() {
            expect(obj.result.length).toEqual(0);
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });

});


var joeId = null;

describe('modelBase get Joe Id',function(){
    var obj = {
        filter:{
            name:"Joe",
            age:"14"
        },
        params:{}
    }


    // Code to Execute before the async spec
    beforeEach(function(done) {
        obj.callback = function(result){
            obj.result = result;
            done();
        };

        helper.get(obj);
    });

    // verify init 
    it('Should return 1 person object with the data {name:Joe,age:14}',
        function() {
            expect(obj.result.length).toEqual(1);
            joeId = obj.result[0]._id;
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });
});



//Update
describe('modelBase update Joe, for Kim ',function(){
    var obj = {
        filter:{},
        params:{},
        operation:{name:'Kim',age:'55'}
    }

    // Code to Execute before the async spec
    beforeEach(function(done) {
        
        obj.filter = {
            _id:joeId
        };

        obj.callback = function(result){
            this.result = result;
            done();
        };

        helper.update(obj);
    });

    // verify init 
    it('Should return {status:"ok"}',
        function() {
            expect(obj.result.status).toEqual("ok");
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });
});


describe('modelBase get Kim after being updated from Joe',function(){
    var obj = {
        filter:{},
        params:{}
    }

    // Code to Execute before the async spec
    beforeEach(function(done) {
        obj.filter = {
            _id:joeId
        };
        obj.callback = function(result){
            obj.result = result;
            done();
        };

        helper.get(obj);
    });

    // verify init 
    it('Should return {name:"Kim",age:"55"}',
        function() {

            expect(obj.result[0].name).toEqual("Kim");
            expect(obj.result[0].age).toEqual("55");
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });
});



describe('modelBase remove Joe',function(){
    
    var obj = {};

    // Code to Execute before the async spec
    beforeEach(function(done) {
        obj.id = joeId;
        obj.callback = function(result){
            obj.result = result;
            done();
        };

        helper.remove(obj);
    });

    // verify init 
    it('Should return {status:ok}',
        function() {
            expect(obj.result.status).toEqual("ok");
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });

});


describe('modelBase get Joe after Remove',function(){
    var obj = {
        filter:{
            _id:joeId
        },
        params:{}
    }


    // Code to Execute before the async spec
    beforeEach(function(done) {
        obj.callback = function(result){
            obj.result = result;
            done();
        };

        helper.get(obj);
    });

    // verify init 
    it('Should return 0 because Joe does not exists',
        function() {
            expect(obj.result.length).toEqual(0);
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });
});

describe('disconnect from the db',function(){
    var obj = {
        
    }

    // Code to Execute before the async spec
    beforeEach(function(done) {
        obj.callback = function()
        {
            done();
        }
        mongoose.disconnect(obj.callback);
    });

    // verify init 
    it('Should return 1 closed connection',
        function() {
            expect(mongoose.connection.base.connections.length).toEqual(1);
    });

    // Code to Execute after the async spec
    afterEach(function(done) {
      done();
    });
});

// ****************************************************************************