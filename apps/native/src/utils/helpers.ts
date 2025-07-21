import Player from '../components/Player';
import Enemy from '../components/Enemy';
import MapBackground from '../components/MapBackground';

export function createInitialEntities() {
  let playerSprite, enemySprite;
  try {
    playerSprite = require("../assets/sprites/player/walk1.png");
  } catch (error) {
    playerSprite = null;
  }
  try {
    enemySprite = require("../assets/sprites/enemy/idle.png");
  } catch (error) {
    enemySprite = null;
  }
  return {
    map: {
      renderer: MapBackground,
      type: "map",
    },
    player: {
      position: [5, 5],
      sprite: playerSprite,
      direction: [0, 0],
      health: 3,
      type: "player",
      renderer: Player,
    },
    enemy: {
      position: [10, 10],
      sprite: enemySprite,
      health: 3,
      type: "enemy",
      moveDelay: 10,
      renderer: Enemy,
    },
  };
} 