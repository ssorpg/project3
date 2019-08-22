import React from 'react';
import axios from 'axios';

const CommentDisplay = (props) => {

  let authName = props.posts.author.name;
  let comment = props.posts.message;

  const deleteComment = (e) => {
    e.preventDefault();
    e.target.parentNode.remove();
    axios
      .delete(`/api/posts/${props.posts.PostId}/comments/${props.posts.id}`)
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const submit = form.getElementsByTagName('button')[0];
    submit.style.visibility = 'hidden';

    const input = form.getElementsByTagName('input')[0];
    const post = {
      message: input.value
    };
    document.getElementById("comment").innerHTML = post.message;

    await postToDB(post);
    submit.style.visibility = 'visible';
  }

  const postToDB = data => {
    console.log(data);
    axios.put(`/api/posts/${props.posts.PostId}/comments/${props.posts.id}`, data);
  }

  return (
    <p>
      <strong>{authName}</strong>: <span id="comment">{comment}</span><br />
      <button type="submit" onClick={deleteComment}>Delete</button> <br />
      <form onSubmit={handleSubmit}>
        <input type="text" name="feed-comment" placeholder="What's on your mind?" style={{ minWidth: '310px', padding: '3px' }} />
        <button type="submit" value="submit">Edit</button>
      </form>
    </p>
  )
}

export default CommentDisplay;