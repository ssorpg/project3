import React from 'react';
import axios from 'axios';

const CommentDisplay = (props) => {

  let authName = props.posts.author.name;
  let comment = props.posts.message;
  
  function deleteComment(e) {
    e.preventDefault();
    e.target.parentNode.remove();
    axios
      .delete(`/api/posts/${props.posts.PostId}/comments/${props.posts.id}`)
  }

  // function editComment(e) {
  //   e.preventDefault();
  //   editCommentForm();
  //   console.log()
  // }

  // function editCommentForm() {
  //   return (
  //     <form>
  //       <input></input>
  //     </form>
  //   )
  // }
  // render() {
  return (
    <p>
      <strong>{authName}</strong>: {comment} <br />
      <button type="submit" onClick={deleteComment}>Delete</button> <br />
      {/* <button type="submit" onClick={editComment}>Edit</button> */}
    </p>
  )
  //}
}


export default CommentDisplay;