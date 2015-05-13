/** @jsx React.DOM */
var React = require('react');
var IndiaAction		=	 require('../../actions/IndiaActions');	
var IndiaStore 		= 	 require('../../stores/IndiaStore');

var LIST = React.createClass ( {


       getInsitialState:function(){
            users = IndiaAction.list();
        }, 
       componentDidMount:function(){
           IndiaStore.addChangeListener(this._onChange);
        },
       componentWillMount : function(){
                  indiaData = IndiaStore.getAll();
                  this.setState({ indiaData : indiaData });
                  UserStore.removeChangeListener(this._onChange);
         },   
       render:function(){
            return(

                  <div>
                      <ul><li>{this.state.indiaData}</li></ul>
                  </div>

              )
        },  
       
 _onChange: function() {
      this.setState({ indiaData : indiaData });
  } 
    
  });
module.exports = LIST;