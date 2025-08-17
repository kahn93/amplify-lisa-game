// Local Storage Backend for Testing

interface LocalStorageTable {
  [key: string]: unknown;
}

class LocalStorageBackend {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  private getTable(): LocalStorageTable {
    const table = localStorage.getItem(this.tableName);
    return table ? JSON.parse(table) : {};
  }

  private saveTable(table: LocalStorageTable): void {
    localStorage.setItem(this.tableName, JSON.stringify(table));
  }

  public insert<T>(key: string, value: T): void {
    const table = this.getTable();
    table[key] = value;
    this.saveTable(table);
  }

  public update<T>(key: string, value: T): void {
    this.insert(key, value);
  }

  public delete(key: string): void {
    const table = this.getTable();
    delete table[key];
    this.saveTable(table);
  }

  public get<T>(key: string): T | null {
    const table = this.getTable();
    return (table[key] as T) || null;
  }

  public getAll(): LocalStorageTable {
    return this.getTable();
  }
}

// Example Usage
const coinBalanceTable = new LocalStorageBackend('coin_balance');
export const gameStateTable = new LocalStorageBackend('game_state');
export const airdropResultsTable = new LocalStorageBackend('airdrop_results');
export const playerDataTable = new LocalStorageBackend('player_data');

export default coinBalanceTable;