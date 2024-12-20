import React, { useEffect } from "react";
import { Text, View } from "react-native";
import DonutChartContainer from "./DonutChartScreen";
const CircleGraph = ({ budgets }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        borderColor: "#555",
      }}
    >
      <DonutChartContainer budgets={budgets} />
    </View>
  );
};

export default CircleGraph;
