/** @jsx React.DOM */

var React 			    = 	 require('react');
var IndiaAction		  =	   require('../../actions/IndiaActions');	
var IndiaStore 		  = 	 require('../../stores/IndiaStore');
var ReactBootstrap  =    require('react-bootstrap');

var country="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22india%2C%20%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";




var APP =
React.createClass({

    _getCountryMap:function(){

      

    },
    getInitialState:function(){

     	 return({
     			indiaData : '',
     			
     			result:[]
     		});		
     },
    componentDidMount:function(){
                              
          $.get(country, function(result) {

     						 var lastGist = result;
     						 if (this.isMounted()) {
     						 	
      					 		 this.setState({
         						 		title: result.query.results.channel.title,
         						 		atmosphere : result.query.results.channel.atmosphere.humidity,
         						 		image : result.query.results.channel.image.url,
         						 		windChill:result.query.results.channel.wind.chill,
         						 		visibility  : result.query.results.channel.atmosphere.visibility,
         						 		sunrise : result.query.results.channel.astronomy.sunrise,
         						 		sunset : result.query.results.channel.astronomy.sunset,
         						 		lastDate : result.query.results.channel.lastBuildDate
          						});
      			}
          this._getCountryMap();  
    		}.bind(this));

        // IndiaStore.addChangeListener(this._onChange);
  		},

    componentWillMount : function(){
                    
     			  indiaData = IndiaStore.getAll();
                  this.setState({ indiaData : indiaData });
                  //IndiaStore.removeChangeListener(this._onChange);

         }, 
    _getWeather : function(){

    	        var countryData = ' ReplaceData '; 
    	        country="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+ countryData +"%2C%20%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
				
     			countryName = this.state.countryName;
     			
     			var newCountry = country.replace(' ReplaceData ', countryName);
     			

     			  $.get(newCountry, function(result) {

     						 var lastGist = result;
     						 if (this.isMounted()) {
     						 	
      					 		 this.setState({
         						 		title: result.query.results.channel.title,
         						 		atmosphere : result.query.results.channel.atmosphere.humidity,
         						 		image : result.query.results.channel.image.url,
         						 		windChill:result.query.results.channel.wind.chill,
         						 		visibility  : result.query.results.channel.atmosphere.visibility,
         						 		sunrise : result.query.results.channel.astronomy.sunrise,
         						 		sunset : result.query.results.channel.astronomy.sunset,
         						 		lastDate : result.query.results.channel.lastBuildDate
          						});
      			}
    		}.bind(this));	
          
     	 this.setState({countryName  : null});		  
     },
    _setText:function(event){

     		 this.setState({countryName  : event.target.value});
     },   
    render:function(){
      return (
      	        <div>
      	        	<ReactBootstrap.Grid>

      	        		 <ReactBootstrap.Row className="show-grid">
          						<ReactBootstrap.Col xs={12} md={8}><h2>{this.state.title}</h2></ReactBootstrap.Col>
          						<ReactBootstrap.Col xs={6} md={4}><img href="http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif" /></ReactBootstrap.Col>
        				</ReactBootstrap.Row>

       					 <ReactBootstrap.Row className="show-grid">
         						 <ReactBootstrap.Col xs={6} md={4}>

         				<ReactBootstrap.Table striped bordered condensed hover>
     					 
      					<tbody>
        						<tr>
         				 			<td>Humidity : </td>
          							<td> {this.state.atmosphere} </td>
          					    </tr>
          					    <tr>
         				 			<td>Wind : </td>
          							<td> {this.state.windChill} </td>
          					    </tr>
          					    <tr>
         				 			<td>Visibility : </td>
          							<td> {this.state.visibility} </td>
          					    </tr>
          					    <tr>
         				 			<td>SunRise : </td>
          							<td> {this.state.sunrise} </td>
          					    </tr>
          					    <tr>
         				 			<td>SunSet : </td>
          							<td> {this.state.sunset} </td>
          					    </tr>	
          					     <tr>
         				 			<td>Last Bulid Date : </td>
          							<td> {this.state.lastDate} </td>
          					    </tr>	
   						</tbody>	    	
   					    </ReactBootstrap.Table>		

         						 </ReactBootstrap.Col>
          						 <ReactBootstrap.Col xs={6} md={4}>
          						 	<ReactBootstrap.Table striped bordered condensed hover>
     									<tbody>
        									<tr>
         				 						<td>Enter Country Name : </td>
          										<td>
          										<ReactBootstrap.Input type="text" id="countryName" name="countryName" onChange={this._setText}/>
          										<ReactBootstrap.Button bsStyle="info" onClick={this._getWeather}>Info</ReactBootstrap.Button>
          										</td>
          					    			</tr>
          					    		</tbody>		
          					    	</ReactBootstrap.Table>		

          						 </ReactBootstrap.Col>
         						 <ReactBootstrap.Col xs={6} md={4}> <div id="map-canvas"></div></ReactBootstrap.Col>
       					 </ReactBootstrap.Row>	
      	        			
      				</ReactBootstrap.Grid>

      		
      			</div>
      	)
    },
    _onChange: function() {
     this.setState({indiaData:IndiaStore.getAll()});
  } 
    
  });
module.exports = APP;