/***********************
 * Routes file
 * contents: routes of stratpulse
 * 		- general
 *		- admin
 *		- user
 *		- misc.
 */
var usersController = require('./controllers/User');
var loginController = require('./controllers/Login');

 module.exports = function(router){

 	/*************************
 	 * General Routes
 	 ************************/

	router.route('/')
		.get(function(req, res){
			//res.send('home page');
			var redirect = false;
			if (redirect == true) {
				res.redirect('/login');
			} else {
				res.render('index');
			};
			
		});

	router.route('/sign_up')
		.get(function(req, res){
			res.render('signup');
		})
		.post(usersController.postUser);


	router.route('/login')
		.get(function(req, res){
			res.render('login');
		})
		.post(loginController.postLogin);

	router.route('/login/facebook')
		.get(loginController.facebookLogin);


	router.get('/sign_up/confirmation', function(req,res){
		res.render('signup_confirmation');
	}); 

	 /*************************
 	 * Admin Routes
 	 ************************/

	router.get('/admin', function(req, res){
		res.render('admin_home')
	})

	/*************************
 	 * User
 	 ************************/

 	router.get('/user', function(req, res){
		res.send('user page')
	})

	 /*************************
 	 * Misc Routes
 	 ************************/

	router.get('*', function(req, res){
		res.send('Error 404 page not found');
	});

 }