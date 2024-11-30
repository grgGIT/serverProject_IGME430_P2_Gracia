import React, { useState } from 'react';

function TweetForm({ onTweetPosted }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    if (response.ok) {
      const newTweet = await response.json();
      onTweetPosted(newTweet);
      setContent('');
    } else {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
      />
      <button type="submit">Tweet</button>
    </form>
  );
}

export default TweetForm;