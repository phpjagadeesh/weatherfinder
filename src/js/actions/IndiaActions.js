/** @jsx React.DOM */
 var  AppDispatcher =	 require('../dispatchers/AppDispatcher');
 var  IndiaConstants	=	 require('../constants/IndiaConstants');

 var IndiaAction = {

 		list :function(countryName){
 			
 				AppDispatcher.handleViewAction({
				  actionType  : IndiaConstants.INDIA_LIST,
				  countryName : countryName
			});
 		}

 }
 module.exports=IndiaAction;