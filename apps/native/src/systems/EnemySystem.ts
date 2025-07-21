let enemyMoveCounter = 0;

export const EnemySystem = (entities, { }) => {
  if (!entities.enemy) return entities;
  const ENEMY_MOVE_DELAY = entities.enemy.moveDelay ?? 10; // Default to 10 if not set
  enemyMoveCounter++;

  if (entities.enemy && entities.player && enemyMoveCounter >= ENEMY_MOVE_DELAY) {
    let [ex, ey] = entities.enemy.position;
    const [px, py] = entities.player.position;
    // Move enemy one step towards player
    if (ex < px) ex++;
    else if (ex > px) ex--;
    if (ey < py) ey++;
    else if (ey > py) ey--;
    entities.enemy.position = [ex, ey];
    enemyMoveCounter = 0; // Reset counter
  }
  return entities;
}; 