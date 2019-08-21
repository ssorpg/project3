import React from 'react';

const CommentDisplay = (props) => {
  // console.log('hi',props.posts)
  // console.log('name',props.posts.author.name)
  let name = props.posts.author.name;
  let comment = props.posts.message;

  return (
    <p>
      <strong>{name} : </strong> {comment}
    </p>
  );
}

export default CommentDisplay