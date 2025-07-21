let tick = 0;
export const AnimationSystem = (entities, { }) => {
  tick++;
  if (entities.player) {
    const [dx, dy] = entities.player.direction;
    if (dx !== 0 || dy !== 0) {
      // Alternate between walk1 and walk2
      if (tick % 2 === 0) {
        entities.player.sprite = require("../assets/sprites/player/walk1.png");
      } else {
        entities.player.sprite = require("../assets/sprites/player/walk2.png");
      }
    } else {
      entities.player.sprite = require("../assets/sprites/player/walk1.png");
    }
  }
  return entities;
}; 