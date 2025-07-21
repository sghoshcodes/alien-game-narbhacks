export const CollisionSystem = (entities, { }) => {
    if (entities.enemy && entities.player) {
      const [ex, ey] = entities.enemy.position;
      const [px, py] = entities.player.position;
      // Check if enemy touches player
      if (ex === px && ey === py) {
        entities.player.gameOver = true;
      }
      // Check lasers
      Object.keys(entities).forEach(key => {
        const entity = entities[key];
        if (entity.type === "laser") {
          const [lx, ly] = entity.position;
          if (lx === ex && ly === ey) {
            entities.enemy.health -= 1;
            delete entities[key]; // Remove laser
            if (entities.enemy.health <= 0) {
              delete entities.enemy;
            }
          }
        }
      });
    }
    return entities;
  }; 