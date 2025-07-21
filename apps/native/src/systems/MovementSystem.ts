const GRID_SIZE = 20;
let canMove = true;
let moveCooldown = 0;
const MOVE_DELAY = 5; // ticks between moves

export const MovementSystem = (entities, { events }) => {
  if (moveCooldown > 0) moveCooldown--;
  let moveEvent = events.find(e => e.type === "MOVE");
  if (moveEvent && entities.player && canMove && moveCooldown === 0) {
    const { x, y } = moveEvent.payload;
    let [px, py] = entities.player.position;
    // Only move if joystick is pushed enough in one direction
    if (Math.abs(x) > Math.abs(y)) {
      if (x > 0.5 && px < GRID_SIZE - 1) px++;
      else if (x < -0.5 && px > 0) px--;
      else return entities;
    } else if (Math.abs(y) > 0.5) {
      if (y > 0.5 && py < GRID_SIZE - 1) py++;
      else if (y < -0.5 && py > 0) py--;
      else return entities;
    } else {
      return entities;
    }
    entities.player.position = [px, py];
    entities.player.direction = [x, y];
    moveCooldown = MOVE_DELAY;
  }
  return entities;
}; 