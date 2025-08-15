import { ResourceManager } from '../../src/game/resourceManager';

interface GetResourceEvent {
  arguments: {
    type: string;
  };
}

export const handler = async (event: GetResourceEvent) => {
  const { type } = event.arguments;
  const resourceManager = new ResourceManager();
  return resourceManager.getResource(type);
};