var App = Ember.Application.create({
	LOG_TRANSITIONS: true //helpful for debugging
});
//App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.ApplicationAdapter = DS.RESTAdapter.extend(); //REST adapter

/*

ROUTER

*/
App.Router.map(function() {
	//no need for index route...
	//normal routes
	this.route('about'); //the about path renders the about tpl
	//this.route('about', { path: '/aboutus' }); //specify a different path

	//resource route
	//this.resource('products');
	//this.resource('products', {path: '/items'});
	
	
	//dynamic route
	//this.resource('product', { path: '/products/:title' });

	//nested route for products
	this.resource('products', function() {
		this.resource('product', {path: '/:product_id'});
	});
	
	this.resource('contacts', function() {
		this.resource('contact', {path: '/:contact_id'});
	});

});

/*

MODELS

*/
App.Product = DS.Model.extend({
	title: DS.attr('string'),
	price: DS.attr('number'),
	description: DS.attr('string'),
	isOnSale: DS.attr('boolean'),
	image: DS.attr('string'),
	reviews: DS.hasMany('review', {async: true}) //relationship to reviews stablished
});

App.Review = DS.Model.extend({
	text: DS.attr('string'),
	reviewedAt: DS.attr('date'),
	product: DS.belongsTo('product') //establishes the relationship to product
});

App.Contact = DS.Model.extend({
	name: DS.attr('string'),
	about: DS.attr('string'),
	avatar: DS.attr('string')
});

//ember data fixetures for Products
// App.Product.FIXTURES = [ //needs to use the FIXTURES constant within the model
// 	{
// 		id: 1, //need to give each product a unique ID
// 		title: 'Flint',
// 		price: 99,
// 		description: 'Flint is..',
// 		isOnSale: true,
// 		image: 'flint.png',
// 		reviews: [100, 101]
// 	},
// 	{
// 		id: 2,
// 		title: 'Kindling',
// 		price: 249,
// 		description: 'Easily..',
// 		isOnSale: false,
// 		image: 'kindling.png'
// 	}
// ];
// App.Review.FIXTURES = [
// 	{
// 		id: 100,
// 		product: 1, //map reviews back to a product!
// 		text: "Started a fire in no time!"
// 	},
// 	{
// 		id: 101,
// 		product: 1, //map reviews back to a product!
// 		text: "Not the brightest flame, but warm!"
// 	}
// ];


/*

CONTROLLER

*/

App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	property: 'my-property',
	time: function() {
		return (new Date()).toDateString();
	}.property()
});

// App.ContactsIndexController = Ember.Controller.extend({
// 	contactName: 'Anostagia',
// 	avatar: 'images/avatar.png',
// 	open: function() {
// 		return ((new Date()).getDay() === 0) ? "Closed" : "Open";
// 	}.property()
// });

/*

ROUTES

*/

App.ProductsRoute = Ember.Route.extend({
	model: function() {
		//return App.PRODUCTS;
		return this.store.findAll('product');
	}
});


//Product Route not needed as this is the ember default behaviour
App.ProductRoute = Ember.Route.extend({
	model: function(params) {
		//console.log(params)
		//return App.PRODUCTS.findBy('title', params.title);
		return this.store.find('product', params.product_id);
	}
});

App.ContactsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('contact');
	}
});

App.ContactRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('contact', params.contact_id);
	}
});



