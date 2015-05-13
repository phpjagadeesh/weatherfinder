/*
 * @Date 04-02-2015
 * @Param from actions/UserAction userDetails
 * Author Accel Frontline@Cochin 
 */ 
 

var AppDispatcher 	= 	require('../dispatchers/AppDispatcher');
var EventEmitter 	= 	require('events').EventEmitter;
var IndiaConstants 	= 	require('../constants/IndiaConstants');
var assign 			=	require('object-assign');

var country = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22 COUNTRY %2C%20%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";


var indiaData = [];
var CHANGE_EVENT = 'change';


var weatherStore	=	 assign({}, EventEmitter.prototype, {
	
		getAll  : function(countryName){
							   	
							var newCountry = country.replace("COUNTRY", countryName);
							result = $.get(newCountry, function(result) {
									 console.log(result);
							   		 return indiaData = result;	
								}.bind(this));
		},
		emitChange: function() {
			    this.emit(CHANGE_EVENT);
		},
		addChangeListener: function(callback) {
			    this.on(CHANGE_EVENT, callback);
		},
		removeChangeListener: function(callback) {
			    this.removeListener(CHANGE_EVENT, callback);
		}   
});

AppDispatcher.register(function(playload){
	
	 var action = playload.action;
	 var countryName;
	
	 switch(action.actionType) {
	 		
	 		
	 		
	 		case IndiaConstants.INDIA_LIST:
	 			 countryName = action.countryName;
                 IndiaData = weatherStore.getAll(countryName);
                 weatherStore.emitChange();

	 		break;
	 		
	 		break;
	 }
	
	 return true;
});

module.exports = weatherStore;