import { API } from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  getAllPlayers as gqlGetAllPlayers,
  saveAirdropResults as gqlSaveAirdropResults,
} from "../graphql/customMutationsAndQueries";

// Airdrop logic for distributing rewards among players

export interface PlayerStats {
  id: string;
  coinsEarned: number;
  upgradesPurchased: number;
  tasksCompleted: number;
  tonSpent: number;
  timeSpent: number;
  achievementsUnlocked: number;
}

export interface AirdropResult {
  id: string;
  percent: number;
  points: number;
}

export class AirdropLogic {
  private totalPercentage = 100;

  // Fetch all players' airdrop points
  async fetchAirdropPlayers(): Promise<PlayerStats[]> {
    try {
      const response: {
        data: { getAllPlayers: PlayerStats[]; };
      } = await API.graphql(graphqlOperation(gqlGetAllPlayers));
      return response.data?.getAllPlayers ?? [];
    } catch (error) {
      console.error("Error fetching airdrop players:", error);
      return [];
    }
  }

  // Save airdrop results
  async saveAirdropResults(results: AirdropResult[]): Promise<void> {
    try {
      await API.graphql(graphqlOperation(gqlSaveAirdropResults, { results }));
    } catch (error) {
      console.error("Error saving airdrop results:", error);
    }
  }

  // Periodically fetch, calculate, and save airdrop results
  startAirdropInterval(intervalMs: number): void {
    setInterval(async () => {
      const players = await this.fetchAirdropPlayers();
      const results = this.calculateAirdrop(players);
      await this.saveAirdropResults(results);
    }, intervalMs);
  }

  // Advanced airdrop calculation logic
  calculateAirdrop(players: PlayerStats[]): AirdropResult[] {
    const totalStats = {
      coinsEarned: 0,
      upgradesPurchased: 0,
      tasksCompleted: 0,
      tonSpent: 0,
      timeSpent: 0,
      achievementsUnlocked: 0,
    };

    // Aggregate total stats
    players.forEach((player) => {
      totalStats.coinsEarned += player.coinsEarned;
      totalStats.upgradesPurchased += player.upgradesPurchased;
      totalStats.tasksCompleted += player.tasksCompleted;
      totalStats.tonSpent += player.tonSpent;
      totalStats.timeSpent += player.timeSpent;
      totalStats.achievementsUnlocked += player.achievementsUnlocked;
    });

    // Calculate percentage for each player
    const airdropResults: AirdropResult[] = players.map((player) => {
      const playerPercentage =
        (player.coinsEarned / totalStats.coinsEarned) * 0.3 +
        (player.upgradesPurchased / totalStats.upgradesPurchased) * 0.2 +
        (player.tasksCompleted / totalStats.tasksCompleted) * 0.2 +
        (player.tonSpent / totalStats.tonSpent) * 0.1 +
        (player.timeSpent / totalStats.timeSpent) * 0.1 +
        (player.achievementsUnlocked / totalStats.achievementsUnlocked) * 0.1;

      return {
        id: player.id,
        points: player.coinsEarned, // Example: Use coinsEarned as points
        percent: Math.min(playerPercentage * this.totalPercentage, this.totalPercentage),
      };
    });

    return airdropResults;
  }

  // Additional advanced logic for airdrop distribution
  validateAirdropResults(results: AirdropResult[]): boolean {
    return results.every(result => result.percent >= 0 && result.percent <= this.totalPercentage);
  }

  logAirdropSummary(results: AirdropResult[]): void {
    console.log("Airdrop Summary:", results.map(result => ({ id: result.id, percent: result.percent })));
  }
}
