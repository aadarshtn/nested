{
    // method to submit form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        });
    }
    // Method to display post data in home page ofcourse dynamically using ajax
    let newPostDom = function(post){
        return $(`<li id = "post-${post._id}">
                    <p>
                        
                        <small>
                            <a class = "delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>
                        
                        ${ post.content }
                        <br>
                        <small>
                            ${ post.user.name }
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${post._id}" >
                                <input type="submit" value="Add Comment">
                            </form>
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                            </ul>
                        </div>
                    </div>
                </li>`)
    }

    // Method To Delete A Post From DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    // method to send form data for comments using ajax
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comment);
                    $('.post-comments-list>ul').prepend(newComment);
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }


    // Method to display comment data in home page ofcourse dynamically using ajax
    let newCommentDom = function(comment){
        return $(`<li id = "comment-${ comment._id }">
                    <p>
                        <small>
                            <a href="/comments/destroy/${ comment._id }">X</a>
                        </small>
                        ${ comment.content }
                        <br>
                        <small>
                            ${ comment.user.name }
                        </small>
                    </p>  
                </li>`);    
    }

    createPost();
    createComment();
}