import React from "react";
import { StyleSheet, View } from "react-native";
import BluetoothScreen from "./BluetoothScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <BluetoothScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "justifyContent",
    justifyContent: "center",
  },
});
// thay doi 1
// thay doi 2
// thay doi 3
// thay doi 4
