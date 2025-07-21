import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const TILE_SIZE = 32;

const Player = ({ position, sprite }) => {
  return sprite ? (
    <Image
      source={sprite}
      style={[
        styles.entity,
        {
          left: position[0] * TILE_SIZE,
          top: position[1] * TILE_SIZE,
          zIndex: 2,
        },
      ]}
    />
  ) : (
    <View
      style={[
        styles.entity,
        styles.playerFallback,
        {
          left: position[0] * TILE_SIZE,
          top: position[1] * TILE_SIZE,
          zIndex: 2,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  entity: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    resizeMode: 'contain',
  },
  playerFallback: {
    backgroundColor: '#007bff',
    borderRadius: TILE_SIZE / 2,
  },
});

export default Player; 