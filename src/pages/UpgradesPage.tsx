import React, { useEffect, useMemo, useState } from 'react';
import { StorageManager } from '../../amplify/storage/resources';
import Button from '../components/Button';
import { UpgradesManager } from '../game/upgradesManager';

const UpgradesPage: React.FC = () => {
  const upgradesManager = new UpgradesManager();
  const storageManager = useMemo(() => new StorageManager(), []); // Wrapped in useMemo
  const [coins, setCoins] = useState(1000); // Example initial coin balance
  const [upgrades, setUpgrades] = useState(upgradesManager.getUpgrades());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching upgrades from backend
    const fetchUpgrades = async () => {
      try {
        const savedUpgrades = await storageManager.loadPlayerData('playerId');
        if (savedUpgrades) {
          setUpgrades(savedUpgrades.upgrades);
        }
      } catch (err) {
        setError('Failed to load upgrades.');
      }
    };
    fetchUpgrades();
  }, [storageManager]);

  const handlePurchase = async (id: string) => {
    setError(null);
    const result = upgradesManager.purchaseUpgrade(id, coins); // Corrected method usage
    if (result.state && result.state.player.lisaTokens !== undefined) {
      setCoins(result.state.player.lisaTokens);
      setUpgrades([...upgrades]); // Update upgrades state
      try {
        await storageManager.savePlayerData('playerId', { upgrades }); // Example playerId
      } catch {
        setError('Failed to save upgrades.');
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="upgrades-page p-4">
      <h1 className="text-2xl font-bold mb-4">Upgrades</h1>
      <p className="text-sm font-medium mb-2">Coins: {coins}</p>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upgrades.map((upgrade) => (
          <li key={upgrade.id} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{upgrade.name}</h3>
            <p className="text-sm text-gray-600">{upgrade.description}</p>
            <p className="text-sm font-medium">Cost: {upgrade.cost}</p>
            <p className="text-sm font-medium">Level: {upgrade.level}</p>
            <Button label="Purchase" onClick={() => handlePurchase(upgrade.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpgradesPage;
