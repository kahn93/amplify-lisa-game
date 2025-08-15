import { ResourceManager } from '../../src/game/resourceManager';

interface AddResourceEvent {
  arguments: {
    type: string;
    amount: number;
  };
}

export const handler = async (event: AddResourceEvent) => {
  const { type, amount } = event.arguments;
  const resourceManager = new ResourceManager();
  resourceManager.addResource(type, amount);
  return `Resource ${type} added successfully.`;
};