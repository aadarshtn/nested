const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Authenntication Using Passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        // Find A User And Establish Identity
        User.findOne({email: email}, function(err, user)  {
            if(err){
                console.log('Error In Finding User -- > Passport');
                return done(err);
            }
            if (!user || user.password != password){
                console.log('Invalid Username or Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
    
));

// Serialising the User To Decide Which Key To Be Encrypt And Add In Cokkie
passport.serializeUser(function(user, done){
    done(null,user.id);
});


// Deserialising The User From The Key In The Cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error In Finding User -- > Passport');
            return done(err);
        }

        return done(null, user);
    });
});


// check if user is authenticated

passport.checkAuthentication = function(req,res,next){
    // if the user is signed in then pass on the req to the next function (controllers action)
    if(req.isAuthenticated()){
        return next();
    }

    // If user is not signed in
    return res.redirect('sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains data this is transferred to locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;