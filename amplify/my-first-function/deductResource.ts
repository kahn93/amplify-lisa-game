import { ResourceManager } from '../../src/game/resourceManager';

interface DeductResourceEvent {
  arguments: {
    type: string;
    amount: number;
  };
}

export const handler = async (event: DeductResourceEvent) => {
  const { type, amount } = event.arguments;
  const resourceManager = new ResourceManager();
  const success = resourceManager.deductResource(type, amount);
  return success ? `Resource ${type} deducted successfully.` : `Failed to deduct resource ${type}.`;
};