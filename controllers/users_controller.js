module.exports.users = function(req,res){
    res.end('<h1>Users Action From UsersController Is Loaded Through Users Route</h1>')
}

module.exports.profile = function(req,res){
    res.end('<h1>Profile Action From UsersController Is Loaded Through Users Route</h1>')
}

module.exports.posts = function(req,res){
    res.end('<h1>Posts Action From UsersController Is Loaded Through Users Route</h1>');
}