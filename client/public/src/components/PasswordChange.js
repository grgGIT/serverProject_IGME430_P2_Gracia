import React, { useState } from 'react';

function PasswordChange() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword, newPassword })
    });
    if (response.ok) {
      // Handle successful password change
    } else {
      // Handle password change error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Old Password" />
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
      <button type="submit">Change Password</button>
    </form>
  );
}

export default PasswordChange;