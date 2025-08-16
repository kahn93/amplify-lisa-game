import React, { useState } from 'react';
import { StorageManager } from '../../amplify/amplify/storage/resources';
import Button from '../components/Button';
import { TonConnectManager } from '../tonconnect/TonConnectManager';

const DailyCheckInPage: React.FC = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const tonConnectManager = new TonConnectManager();
  const storageManager = new StorageManager();

  const handleCheckIn = async () => {
    try {
      await tonConnectManager.handleAirdrop(); // Deduct TON from wallet
      await storageManager.adjustPlayerCoins('playerId', 10000000); // Example playerId
      alert('Daily check-in successful! You received 10,000,000 coins.');
      setCheckedIn(true);
    } catch (error) {
      alert('Daily check-in failed. Please try again.');
    }
  };

  return (
    <div className="daily-check-in-page">
      <h1>Daily Check-In</h1>
      <p>Pay 0.5 TON to receive 10,000,000 coins as a reward.</p>
      <Button
        label={checkedIn ? 'Checked In' : 'Check In'}
        onClick={handleCheckIn}
        disabled={checkedIn}
      />
    </div>
  );
};

export default DailyCheckInPage;
