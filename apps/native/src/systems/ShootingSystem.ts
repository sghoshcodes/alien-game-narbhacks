let laserId = 0;

export const ShootingSystem = (entities, { events }) => {
  let shootEvent = events.find(e => e.type === "SHOOT");
  if (shootEvent && entities.player) {
    const [px, py] = entities.player.position;
    const [dx, dy] = entities.player.direction;
    if (dx !== 0 || dy !== 0) {
      // Add a new laser entity
      entities[`laser_${laserId++}`] = {
        position: [px, py],
        direction: [dx, dy],
        type: "laser",
        // Add sprite or color as needed
      };
    }
  }
  // Move all lasers
  Object.keys(entities).forEach(key => {
    const entity = entities[key];
    if (entity.type === "laser") {
      entity.position = [
        entity.position[0] + entity.direction[0],
        entity.position[1] + entity.direction[1],
      ];
    }
  });
  return entities;
}; 