import React, { useEffect, useState } from 'react';

function Profile() {
  const [profile, setProfile] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch('/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (response.ok) {
      // Handle successful update
    } else {
      // Handle update error
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        placeholder="Username"
      />
      <input
        type="email"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        placeholder="Email"
      />
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default Profile;