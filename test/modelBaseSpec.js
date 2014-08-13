'use strict';

var modelBase = require('../mongocontroller/ModelBase.js');
var mongoose = require('mongoose');

//Create the schema to work
function PersonHelper(){
    this.documentDefinition = new mongoose.Schema({
        name:String,
        age: Number              
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
        helper.init(mongoose,"person", helper.documentDefinition, resultCallback );      
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

/*
// verify save
    

    //verify get
    it('Should return the virified schema {name:"Joe"}',function(){
        expect(false);
    });

    //verify multi get
    it('Should return the list of elements schema ' 
                            +'[{name:"Joe"},{name:"Mary"}]',function(){
        expect(false);
    });


    //verify remove
    it('Should remove the entity and return {status:"ok"}',function(){
        expect(false);
    });

    //verify remove with filter
    it('Should remove the entity and return {status:"ok"}',function(){
        expect(false);
    });

    //verify count 0
    it('should return 0 after removing all db objects',function(){
        expect(false);
    });

    //verify count more than 0  
    it('should return 5 after creating 5 entities',function(){
        expect(false);
    });

    //verify update
    it('Should update the entity after being created and updated',function(){
        expect(false);
    });


*/