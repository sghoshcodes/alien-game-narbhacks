import React from 'react';
import { Image, StyleSheet } from 'react-native';

const TILE_SIZE = 32;

const MapBackground = () => (
  <Image
    source={require('../assets/map.png')}
    style={styles.mapBackground}
  />
);

const styles = StyleSheet.create({
  mapBackground: {
    position: 'absolute',
    width: TILE_SIZE * 20,
    height: TILE_SIZE * 20,
    left: 0,
    top: 0,
    zIndex: 0,
  },
});

export default MapBackground; 