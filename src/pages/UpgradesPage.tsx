import React, { useState } from 'react';
import Button from '../components/Button';
import { UpgradesManager } from '../game/upgradesManager';

const UpgradesPage: React.FC = () => {
  const upgradesManager = new UpgradesManager();
  const [coins, setCoins] = useState(1000); // Example initial coin balance
  const [upgrades, setUpgrades] = useState(upgradesManager.getUpgrades());

  const handlePurchase = (id: string) => {
    const result = upgradesManager.purchaseUpgrade(id, coins);
    if (result.success) {
      setCoins(result.newCoins);
      setUpgrades([...upgrades]); // Update upgrades state
    } else {
      alert('Not enough coins to purchase this upgrade.');
    }
  };

  return (
    <div className="upgrades-page">
      <h1>Upgrades</h1>
      <p>Coins: {coins}</p>
      <ul>
        {upgrades.map((upgrade) => (
          <li key={upgrade.id}>
            <h3>{upgrade.name}</h3>
            <p>{upgrade.description}</p>
            <p>Cost: {upgrade.cost}</p>
            <p>Level: {upgrade.level}</p>
            <Button label="Purchase" onClick={() => handlePurchase(upgrade.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpgradesPage;
