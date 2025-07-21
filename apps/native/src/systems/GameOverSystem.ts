export const GameOverSystem = (entities, { }) => {
    if (entities.player && entities.player.gameOver) {
      entities.gameOver = {
        type: "gameOver",
        message: "Game Over!",
      };
    }
    return entities;
  }; 