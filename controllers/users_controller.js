module.exports.users = function(req,res){
    return res.render('./users/users', {
        title : "Users"
    });
}

module.exports.profile = function(req,res){
    return res.render('./users/profile', {
        title : "Profile"
    });
}

module.exports.posts = function(req,res){
    return res.render('./users/posts', {
        title : "Posts"
    });
}

module.exports.signup = function(req,res){
    return res.render('./users/signup', {
        title : "nested | SignUp"
    });
};

module.exports.login = function(req,res){
    return res.render('./users/login', {
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
                return res.redirect('./users/login');
            })
        }else{
            return res.redirect('back');
        }
    });
};

// Signin and create a user session
module.exports.createSession = function(req,res){
    return res.redirect('/');
}