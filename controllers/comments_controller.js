const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
        let posts = await Post.findById(req.body.post);
        if(posts){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            posts.comments.push(comment);
            posts.save();
            

            if(req.xhr){
                comment = await comment.populate('user', 'name').execPopulate();
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Created"
                });
            }
            return res.redirect('back');  
    }
    }catch(err){
        req.flash('error', err);
        console.log('Error', err);
        return;
    }
}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }    
            return res.redirect('back');

        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
}