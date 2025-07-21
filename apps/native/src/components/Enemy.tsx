import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const TILE_SIZE = 32;

const Enemy = ({ position, sprite }) => {
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
        styles.enemyFallback,
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
  enemyFallback: {
    backgroundColor: '#dc3545',
    borderRadius: TILE_SIZE / 2,
  },
});

export default Enemy; 