// Basic entity type
type Position = [number, number];

export interface Entity {
  position: Position;
  type: string;
  [key: string]: any;
}

export interface Player extends Entity {
  direction: Position;
  health: number;
  sprite: any;
  gameOver?: boolean;
}

export interface Enemy extends Entity {
  health: number;
  sprite: any;
}

export interface Laser extends Entity {
  direction: Position;
}

export interface MapEntity extends Entity {
  tiles: any[];
} 