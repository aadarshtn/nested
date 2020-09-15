module.exports.users = function(req,res){
    return res.render('./users/users', {
        title : "Users"
    });
}

module.exports.profile = function(req,res){
    return res.render('./users/profile/profile', {
        title : "Profile"
    });
}

module.exports.posts = function(req,res){
    return res.render('./users/posts/posts', {
        title : "Posts"
    });
}