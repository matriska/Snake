export interface Position {
  x: number;
  y: number;
}

export interface Obstacle {
  position: Position;
  timestamp: string;
}

export interface HighScoreEntry {
  username: string;
  score: number;
}
