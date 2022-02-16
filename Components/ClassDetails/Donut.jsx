import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const Donut = ({ percentage }) => {
  const radius = 80;
  const circleCircumference = 2 * Math.PI * radius;

  const color = percentage >= 90 ? "#30d158" : percentage >= 80 ? "#ffd60a" : "#ff443a";

  const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="160" width="160" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#F1F6F9"
              fill="transparent"
              strokeWidth="10"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={color}
              fill="transparent"
              strokeWidth="10"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <View style={{position: "absolute"}}>
          <Text style={[styles.text, { fontSize: 20 }]}>{percentage}</Text>
          <Text style={[styles.text, { fontSize: 15 }]}>Class Average</Text>
        </View>
      </View>
    </View>
  );
};

export default Donut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    color: "#394867",
  },
});