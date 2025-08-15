import React, { useState } from 'react';
import Button from '../components/Button';

interface PremiumUpgrade {
  id: string;
  name: string;
  description: string;
  costInTon: number;
  purchased: boolean;
}

const StorePage: React.FC = () => {
  const [premiumUpgrades, setPremiumUpgrades] = useState<PremiumUpgrade[]>([
    { id: '1', name: 'Golden Pickaxe', description: 'Earn 5x coins per click.', costInTon: 1, purchased: false },
    { id: '2', name: 'Diamond Drill', description: 'Earn 10x coins per click.', costInTon: 2, purchased: false },
    // Add 8 more premium upgrades here...
  ]);

  const handlePurchase = (id: string) => {
    setPremiumUpgrades((prevUpgrades) =>
      prevUpgrades.map((upgrade) =>
        upgrade.id === id ? { ...upgrade, purchased: true } : upgrade
      )
    );
    alert('Purchase successful!');
  };

  return (
    <div className="store-page">
      <h1>Premium Store</h1>
      <ul>
        {premiumUpgrades.map((upgrade) => (
          <li key={upgrade.id}>
            <h3>{upgrade.name}</h3>
            <p>{upgrade.description}</p>
            <p>Cost: {upgrade.costInTon} TON</p>
            <Button
              label={upgrade.purchased ? 'Purchased' : 'Buy'}
              onClick={() => handlePurchase(upgrade.id)}
              disabled={upgrade.purchased}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorePage;
