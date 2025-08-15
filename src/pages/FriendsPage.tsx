import React, { useState } from 'react';
import Button from '../components/Button';

interface Friend {
  id: string;
  name: string;
  referred: boolean;
}

const FriendsPage: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: 'John Doe', referred: false },
    { id: '2', name: 'Jane Smith', referred: false },
    // Add more friends here...
  ]);

  const handleInvite = (id: string) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === id ? { ...friend, referred: true } : friend
      )
    );
    alert('Friend invited successfully!');
  };

  return (
    <div className="friends-page">
      <h1>Friends</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <h3>{friend.name}</h3>
            <Button
              label={friend.referred ? 'Invited' : 'Invite'}
              onClick={() => handleInvite(friend.id)}
              disabled={friend.referred}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsPage;
