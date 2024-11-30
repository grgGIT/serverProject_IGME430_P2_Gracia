import React, { useEffect, useState } from 'react';

function Feed() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch('/tweets');
      const data = await response.json();
      setTweets(data);
    };
    fetchTweets();
  }, []);

  return (
    <div>
      <h1>Tweet Feed</h1>
      {tweets.map(tweet => (
        <div key={tweet._id}>
          <h3>{tweet.author.username}</h3>
          <p>{tweet.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Feed;