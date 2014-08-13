'use strict';

var modelBase = require('../mongocontroller/ModelBase.js');
var mongoose = require('mongoose');

describe('modelBase',function(){

    //Create the schema to work
    function PersonHelper(){
        this.documentDefinition = new mongoose.Schema({
            name:String,
            age: Number              
        });
    };

    PersonHelper.prototype = new modelBase();

    var helper = new PersonHelper();

    beforeEach(function(done) {
        var resultCallback = function(obj){
            done();
            return obj;
        };
        helper.init(mongoose,"person", helper.documentDefinition, resultCallback );      
    });

    // verify init 
    it('Should return ok if init is {status:"ok"}',function() {
        console.log("result:"+helper.dbStatus.status);
        expect(helper.dbStatus.status).toEqual("ok");
    });

    afterEach(function(done) {
      done();
    });

});


/*
// verify save
    it('Should save object {name:"Joe"} and return {status:"ok"}',function(){
        expect(false);
    });

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