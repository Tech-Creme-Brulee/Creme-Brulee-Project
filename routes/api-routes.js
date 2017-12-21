// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json({
      url: "/members",
      loggedin: true
    });

  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    res.json({
      userCreated: true
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Route for storing search result into Cannabis table
  app.post("/api/search_data", function (req, res) {
    console.log(req.body);
    db.Cannabis.create({
      ucpc: req.body.ucpc
    });
  });

  // get cannabis id 
  app.get("/api/cannabis_data", function (req, res) {
    db.Cannabis.findAll({}).then(function (dbCannabis) {
      // We have access to the reviews as an argument inside of the callback function
      res.json(dbCannabis);
    });
  })

  // GET route for getting all of the reviews
  app.get("/api/reviews", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Comment.findAll({}).then(function (dbComment) {
      // We have access to the reviews as an argument inside of the callback function
      res.json(dbComment);
    });
  });


  // POST route for saving a new review
  app.post("/api/reviews", function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Comment.create({
      body: req.body.text,
      UserId: req.user.id,
      CannabiId: req.body.CannabiId
    }).then(function (dbComment) {
      // We have access to the new review as an argument inside of the callback function
      res.json(dbComment);
    });
  });

  // DELETE route for deleting reviews. We can get the id of the review to be deleted from
  // req.params.id
  app.delete("/api/reviews/:id", function (req, res) {
    // We just have to specify which review we want to destroy with "where"
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbComment) {
      res.json(dbComment);
    });

  });

  // PUT route for updating reviews. We can get the updated review data from req.body
  app.put("/api/reviews", function (req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Comment.update({
      body: req.body.text
    }, {
      where: {
        id: req.body.id
      }
    }).then(function (dbComment) {
      res.json(dbComment);
    });
  });
};