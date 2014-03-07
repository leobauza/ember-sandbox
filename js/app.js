var App = Ember.Application.create({
	LOG_TRANSITIONS: true //helpful for debugging
});
App.ApplicationAdapter = DS.FixtureAdapter.extend();
//App.ApplicationAdapter = DS.RESTAdapter.extend(); //REST adapter

/*

ROUTER

*/
App.Router.map(function() {
	//no need for index route...
	//normal routes
	//this.route('about'); //the about path renders the about tpl
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
	reviews: DS.hasMany('review', {async: true}), //relationship to reviews stablished
	crafter: DS.belongsTo('contact')
});

App.Review = DS.Model.extend({
	text: DS.attr('string'),
	reviewedAt: DS.attr('date'),
	product: DS.belongsTo('product') //establishes the relationship to product
});

App.Contact = DS.Model.extend({
	name: DS.attr('string'),
	about: DS.attr('string'),
	avatar: DS.attr('string'),
	products: DS.hasMany('product', {async: true})
});


/*

ROUTES

*/
App.IndexRoute = Ember.Route.extend({
	model: function() {
		console.log("the ember route class: ", this);
		return this.store.findAll('product');
	}
});


App.ProductsRoute = Ember.Route.extend({
	model: function() {
		console.log("the ember route class: ", this);
		//return App.PRODUCTS;
		return this.store.findAll('product');
		//return this.store.find('product', {order: 'title'}); //this will generate a url like example.com/products?order=title sorting happens server side
	}
});
//Product Route not needed as this is the ember default behaviour
// App.ProductRoute = Ember.Route.extend({
// 	model: function(params) {
// 		//console.log(params)
// 		//return App.PRODUCTS.findBy('title', params.title);
// 		return this.store.find('product', params.product_id);
// 	}
// });

App.ContactsIndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('contact', 200);
	}
});

App.ContactsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('contact');
	}
});
//Same as product route this is an ember default
// App.ContactRoute = Ember.Route.extend({
// 	model: function(params) {
// 		return this.store.find('contact', params.contact_id);
// 	}
// });


/*

CONTROLLERS

*/

// App.IndexController = Ember.Controller.extend({
// 	productsCount: 6,
// 	property: 'my-property',
// 	time: function() {
// 		return (new Date()).toDateString();
// 	}.property()
// });

//change the above to be dynamic
App.IndexController = Ember.ArrayController.extend({
	// productsCount: function() {
	// 	return this.get('length'); //looks for length property of the ArrayController...finds none...delegates to the model and finds the lenght of the model (product array). == model.length
	// }.property('length') //keeps a watch of the length property of the controller and if it changes update productsCount
	
	//shortened version of the above
	productsCount: Ember.computed.alias('length'),
	
	// onSale: function() {
	// 	return this.filter(function(product) {
	// 		return product.get('isOnSale');
	// 	});
	// }.property(),
	
	//or shorter version:
	onSale: function() {
		//filterBy is a method of the ArrayController
		return this.filterBy('isOnSale', true).slice(0, 3);  //the "this" refers to the model assigned to this in the route above so...product
		//slice will give us the first three items in the array
	}.property('@each.isOnSale'), //update this property if the isOnSale attr on any product changes
	
	property: 'my-prop',
	time: function() {
		return (new Date()).toDateString();
	}.property(),
	thisis: function() {
		console.log("this controller: ", this);
		console.log("this controller's model: ", this.get('model.type'));
		return {
			one: this.get('model').get('length'),
			two: this.get('length'),
			three: this.get('model.length')
		}
	}.property()
	
});


App.ProductsController = Ember.ArrayController.extend({
	sortProperties: ['title'],
	sortAscending: true
});


App.ContactsIndexController = Ember.ObjectController.extend({
	contactName: Ember.computed.alias('name'),
	avatar: 'images/avatar.png',
	open: function() {
		
		return ((new Date()).getDay() === 0) ? "Closed" : "Open";
	}.property()
});

App.ContactsController = Ember.ArrayController.extend({
	sortProperties: ['name'],
	sortAscending: false,
	something: function() {
		console.log("this controller?: ", this);
		console.log("this controller's model?: ", this.get('model.type'));
		return "only here to log out controller and model";
	}.property()
});

/*

FIXTURES

*/
App.Product.FIXTURES = [ //needs to use the FIXTURES constant within the model
	{
		id: 1, //need to give each product a unique ID
		title: 'Flint',
		price: 99,
		description: 'Flint is..',
		isOnSale: true,
		image: 'flint.png',
		reviews: [100, 101],
		crafter: 200
	},
	{
		id: 2,
		title: 'Kindling',
		price: 249,
		description: 'Easily..',
		isOnSale: false,
		image: 'kindling.png',
		crafter: 201
	},
	{
		id: 3,
		title: 'Bow Drill',
		price: 49.99,
		description: 'Easily..',
		isOnSale: false,
		image: 'bowdrill.png',
		crafter: 200
	},
	{
		id: 4,
		title: 'Zebra',
		price: 20,
		description: 'Easily..',
		isOnSale: true,
		image: 'zebra.png',
		crafter: 200
	},
	{
		id: 5,
		title: 'Canon',
		price: 200,
		description: 'Easily..',
		isOnSale: false,
		image: 'canon.png',
		crafter: 201
	},
	{
		id: 6,
		title: 'Dragon',
		price: 2000,
		description: 'Easily..',
		isOnSale: true,
		image: 'dragon.png',
		reviews: [102, 103],
		crafter: 201
	}
];

App.Review.FIXTURES = [
	{
		id: 100,
		product: 1, //map reviews back to a product!
		text: "Started a fire in no time!"
	},
	{
		id: 101,
		product: 1, //map reviews back to a product!
		text: "Not the brightest flame, but warm!"
	},
	{
		id: 102,
		product: 6, //map reviews back to a product!
		text: "its a flippin dragon!"
	},
	{
		id: 101,
		product: 6, //map reviews back to a product!
		text: "dragons..."
	}
];

App.Contact.FIXTURES = [
	{
    id: 200,
    name: "Giamia",
    about: "Although Giamia came from a humble spark of lightning, he quickly grew to be a great craftsman, providing all the warming instruments needed by those close to him.",
    avatar: "images/contacts/giamia.png",
  	products: [1, 3, 4]
	},
  {
    id: 201,
    name: "Anostagia",
    about: "Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.",
    avatar: "images/contacts/anostagia.png",
  	products: [2, 5, 6]
  }
];








