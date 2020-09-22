const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authenntication Using Passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done){
        // Find A User And Establish Identity
        User.findOne({email : email}, function(err,user){
            if(err){
                console.log('Error In Finding User -- > Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username or Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }));

// Serialising the User To Decide Which Key To Be Encrypt And Add In Cokkie
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// Deserialising The User From The Key In The Cookie
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error In Finding User -- > Passport');
            return done(err);
        }

        return done(null,user);
    })
});


module.exports = passport;