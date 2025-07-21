import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function RestartButton({ onRestart }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onRestart}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>Restart Game</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: [{ translateX: -60 }],
    width: 120,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
}); 