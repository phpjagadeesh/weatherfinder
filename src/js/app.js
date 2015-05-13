/** @jsx React.DOM */
var React = require('react');

var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Route = Router.Route, DefaultRoute = Router.DefaultRoute, Link=Router.Link, RouteHandler = Router.RouteHandler;

var ReactBootstrap = require('react-bootstrap');
var Nav = ReactBootstrap.Nav;

var ReactRouterBootstrap = require('react-router-bootstrap'),
  	NavItemLink = ReactRouterBootstrap.NavItemLink, ButtonLink = ReactRouterBootstrap.ButtonLink;

var Dashboard = require('./components/Dashboard/Main');
var India = require('./components/India/Main');


var App = React.createClass({
	render: function () {  	
	return (    
		<div>
			<header>
			
				<div className="pull-right mr-10">
				
					<Nav bsStyle="pills" Select={this.handleSubmit}>
						<NavItemLink to="dashboard">Dashboard</NavItemLink>
						<NavItemLink to="india">India</NavItemLink>
					</Nav>	
					
				</div>	
			</header>
			<div className="rootcontainer">
				{<RouteHandler/>} 
			</div>    
			
		</div>
	);
	}
});

var routes = (
    <Route name="app" path="/" handler={App}>
    <Route name="dashboard" handler={Dashboard}/>
    <Route name="india" handler={India}/>
    <DefaultRoute handler={Dashboard}/>
    </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
