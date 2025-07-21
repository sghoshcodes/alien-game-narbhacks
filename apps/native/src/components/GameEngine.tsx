import React, { useRef } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { AxisPad, AxisPadTouchEvent } from "@fustaro/react-native-axis-pad";
import ShootButton from "./ShootButton";
import RestartButton from "./RestartButton";
import { GameEngine } from "react-native-game-engine";
import { MovementSystem, EnemySystem, ShootingSystem, CollisionSystem, AnimationSystem, GameOverSystem } from "../systems";
import { createInitialEntities } from "../utils/helpers";

const TILE_SIZE = 32; // px per grid cell

function EntityRenderer({ entities }) {
  console.log("EntityRenderer called with entities:", entities);
  
  // Handle null entities
  if (!entities) {
    console.log("Entities is null, rendering fallback");
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>Loading...</Text>
        </View>
      </View>
    );
  }
  
  // Render player, enemy, lasers, and game over message
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Map background */}
      <Image
        source={require("../assets/map.png")}
        style={styles.mapBackground}
      />
      {/* Player */}
      {entities?.player && entities.player.sprite && (
        <Image
          source={entities.player.sprite}
          style={[
            styles.entity,
            {
              left: entities.player.position[0] * TILE_SIZE,
              top: entities.player.position[1] * TILE_SIZE,
              zIndex: 2,
            },
          ]}
        />
      )}
      {/* Player fallback if no sprite */}
      {entities?.player && !entities.player.sprite && (
        <View
          style={[
            styles.entity,
            styles.playerFallback,
            {
              left: entities.player.position[0] * TILE_SIZE,
              top: entities.player.position[1] * TILE_SIZE,
              zIndex: 2,
            },
          ]}
        />
      )}
      {/* Enemy */}
      {entities?.enemy && entities.enemy.sprite && (
        <Image
          source={entities.enemy.sprite}
          style={[
            styles.entity,
            {
              left: entities.enemy.position[0] * TILE_SIZE,
              top: entities.enemy.position[1] * TILE_SIZE,
              zIndex: 2,
            },
          ]}
        />
      )}
      {/* Enemy fallback if no sprite */}
      {entities?.enemy && !entities.enemy.sprite && (
        <View
          style={[
            styles.entity,
            styles.enemyFallback,
            {
              left: entities.enemy.position[0] * TILE_SIZE,
              top: entities.enemy.position[1] * TILE_SIZE,
              zIndex: 2,
            },
          ]}
        />
      )}
      {/* Lasers */}
      {entities && Object.keys(entities)
        .filter((key) => entities[key]?.type === "laser")
        .map((key) => (
          <View
            key={key}
            style={[
              styles.laser,
              {
                left: entities[key].position[0] * TILE_SIZE + TILE_SIZE / 4,
                top: entities[key].position[1] * TILE_SIZE + TILE_SIZE / 4,
              },
            ]}
          />
        ))}
      {/* Game Over */}
      {entities?.gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>{entities.gameOver.message}</Text>
        </View>
      )}
    </View>
  );
}

export default function GameEngineComponent() {
  const engine = useRef(null);
  const [running, setRunning] = React.useState(true);
  const [entities, setEntities] = React.useState(createInitialEntities());
  const lastMove = useRef({ x: 0, y: 0 });

  // Restart function
  const restartGame = () => {
    setEntities(createInitialEntities());
    setRunning(true);
    if (engine.current) engine.current.swap(createInitialEntities());
  };

  // AxisPad event handler
  const handleAxisPadEvent = (event: AxisPadTouchEvent) => {
    const threshold = 0.01;
    if (
      event.eventType === "end" ||
      Math.abs(event.ratio.x - lastMove.current.x) > threshold ||
      Math.abs(event.ratio.y - lastMove.current.y) > threshold
    ) {
      lastMove.current = { x: event.ratio.x, y: event.ratio.y };
      if (engine.current) {
        engine.current.dispatch({ type: "MOVE", payload: { x: event.ratio.x, y: event.ratio.y } });
      }
    }
  };

  // GameEngine systems
  const systems = [
    MovementSystem,
    EnemySystem,
    ShootingSystem,
    CollisionSystem,
    AnimationSystem,
    GameOverSystem,
  ];

  // Game over detection
  React.useEffect(() => {
    if (entities.gameOver) setRunning(false);
  }, [entities]);

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <GameEngine
          ref={engine}
          style={StyleSheet.absoluteFill}
          systems={systems}
          entities={entities}
          running={running}
          onEvent={e => {
            if (e && e.type === "RESTART") restartGame();
          }}
        />
      </View>
      {/* Use AxisPad joystick */}
      <View style={{ position: "absolute", bottom: 40, left: 30, zIndex: 10 }}>
        <AxisPad
          id={"pad-1"}
          size={100}
          onTouchEvent={handleAxisPadEvent}
        />
      </View>
      {/* Shoot button */}
      <ShootButton engine={engine} />
      {entities && typeof (entities as any).gameOver === 'object' && (entities as any).gameOver && <RestartButton onRestart={restartGame} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gameContainer: { flex: 1, backgroundColor: "#222" },
  mapBackground: {
    position: "absolute",
    width: TILE_SIZE * 20, // 20x20 grid
    height: TILE_SIZE * 20,
    left: 0,
    top: 0,
    zIndex: 0,
  },
  entity: {
    position: "absolute",
    width: TILE_SIZE,
    height: TILE_SIZE,
    resizeMode: "contain",
  },
  playerFallback: {
    backgroundColor: "#007bff",
    borderRadius: TILE_SIZE / 2,
  },
  enemyFallback: {
    backgroundColor: "#dc3545",
    borderRadius: TILE_SIZE / 2,
  },
  laser: {
    position: "absolute",
    width: TILE_SIZE / 2,
    height: TILE_SIZE / 4,
    backgroundColor: "#f00",
    borderRadius: 4,
    zIndex: 1,
  },
  gameOverContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 10,
  },
  gameOverText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  fallbackContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
    zIndex: 1,
  },
  fallbackText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});