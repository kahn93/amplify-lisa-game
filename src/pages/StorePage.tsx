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
  const [premiumUpgrades, setPremiumUpgrades] = useState<PremiumUpgrade[]>(
    [
      { id: '1', name: 'Golden Pickaxe', description: 'Earn 5x coins per click.', costInTon: 1, purchased: false },
      { id: '2', name: 'Diamond Drill', description: 'Earn 10x coins per click.', costInTon: 2, purchased: false },
      { id: '3', name: 'Platinum Shovel', description: 'Earn 15x coins per click.', costInTon: 3, purchased: false },
      { id: '4', name: 'Ruby Hammer', description: 'Earn 20x coins per click.', costInTon: 4, purchased: false },
      { id: '5', name: 'Emerald Axe', description: 'Earn 25x coins per click.', costInTon: 5, purchased: false },
      { id: '6', name: 'Sapphire Blade', description: 'Earn 30x coins per click.', costInTon: 6, purchased: false },
      { id: '7', name: 'Obsidian Pickaxe', description: 'Earn 35x coins per click.', costInTon: 7, purchased: false },
      { id: '8', name: 'Crystal Drill', description: 'Earn 40x coins per click.', costInTon: 8, purchased: false },
      { id: '9', name: 'Titanium Hammer', description: 'Earn 45x coins per click.', costInTon: 9, purchased: false },
      { id: '10', name: 'Quantum Extractor', description: 'Earn 50x coins per click.', costInTon: 10, purchased: false },
    ]
  );

  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setPremiumUpgrades((prevUpgrades) =>
        prevUpgrades.map((upgrade) =>
          upgrade.id === id ? { ...upgrade, purchased: true } : upgrade
        )
      );
      setIsLoading(false);
      alert('Purchase successful!');
    }, 1000); // Simulate API call
  };

  return (
    <div className="store-page p-4">
      <h1 className="text-2xl font-bold mb-4">Premium Store</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {premiumUpgrades.map((upgrade) => (
          <li key={upgrade.id} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{upgrade.name}</h3>
            <p className="text-sm text-gray-600">{upgrade.description}</p>
            <p className="text-sm font-medium">Cost: {upgrade.costInTon} TON</p>
            <Button
              label={upgrade.purchased ? 'Purchased' : isLoading ? 'Processing...' : 'Buy'}
              onClick={() => handlePurchase(upgrade.id)}
              disabled={upgrade.purchased || isLoading}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorePage;
