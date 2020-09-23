const { session } = require('passport');
const passport = require('passport');
const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title : "Profile"
    })
}

module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('profile');
    }

    return res.render('user_sign_up', {
        title : "nested | Sign Up"
    })
}

module.exports.signIn = function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('profile');
    }
    
    return res.render('user_sign_in', {
        title : "nested | LogIn"
    })
}

// Get The SignUp Data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log('Passwords Not Matching');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log("Error In Finding User In Signing Up");return}
        
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log("Error In Creating User While Signing Up");return}

                return res.redirect('/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

// Signin and create a user session
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}