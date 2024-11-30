import React from 'react';

function TweetComp({ tweet }) {
  return (
    <div>
      <h3>{tweet.author.username}</h3>
      <p>{tweet.content}</p>
    </div>
  );
}

export default TweetComp;