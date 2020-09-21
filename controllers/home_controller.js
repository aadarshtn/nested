// Structure
// module.exports.actionName = function(req,res){Required Tasks Are Written Here};

const User = require('../models/user');

module.exports.home = function(req,res){
    return res.render('home', {
        title : "nested | Home"
    });
};

module.exports.signup = function(req,res){
    return res.render('signup', {
        title : "nested | SignUp"
    });
};

module.exports.login = function(req,res){
    return res.render('login', {
        title : "nested | LogIn"
    });
};

// Get The SignUp Data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log('Passwords Not Matching');
        return res.redirect('back');
    }
    User.findOne({email : req.body.email}, function(err,user){
        if(err){
            console.log("Error In Finding User In Signing Up");
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log("Error In Creating User While Signing Up");
                    return;
                }
                return res.redirect('/login');
            })
        }else{
            return res.redirect('back');
        }
    });
};

// Signin and create a user session
module.exports.createSession = function(req,res){

    // Steps To Authenticate
    // Find The User
    User.findOne({email : req.body.email}, function(err,user){
        if(err){
            console.log('Error In Finding User Matching The Given Email');
            return
        }
        // Handle If The User Is Found
        if(user){
            // Handle Password Mismatch If Any
            if(user.password != req.body.password){
                return res.redirect('back');
            }   
            // Handle Session Creation
            res.cookie('user_id', user.id);
            return res.redirect('profile');
        }else{
            // Handle If User Is Not Found
            return res.redirect('back');
        }
    });

    

    
}