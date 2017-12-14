// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    
    return res.sendFile(path.join(__dirname, "../public/views/index.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    // to verify user is in database user.find 
    if (req.user) {//req.user === the query result of the user id 
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/views/login.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/views/signup.html"));
  });

  app.get("/reviews", function(req, res){
    res.sendFile(path.join(__dirname, "../public/views/reviews.html"));
  })

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/members.html"));
  });

};