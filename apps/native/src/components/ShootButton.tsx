import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ShootButton({ engine }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => engine.current && engine.current.dispatch({ type: "SHOOT" })}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>🔫</Text> {/* Replace with icon if available */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 40,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e53935",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontSize: 32,
  },
}); 