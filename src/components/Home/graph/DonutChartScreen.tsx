/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DonutChart from "./DonutChart";
import { useFont } from "@shopify/react-native-skia";
import { TouchableOpacity } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { calculatePercentage } from "./utils/calculatePercentage";
import RenderItem from "./RenderItem";
import { SafeAreaView } from "react-native-safe-area-context";
import IconBudgetSystem from "../../../icon/IconBugetSystem";
import { set } from "date-fns";
import ColorSystem from "../../../color/ColorSystem";

interface Data {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const RADIUS = 130;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 50;
const GAP = 0.05;

export const DonutChartContainer = ({ budgets }) => {
  const n = budgets.length;
  const [data, setData] = useState<Data[]>([]);
  const totalValue = useSharedValue(0);
  const decimals = useSharedValue<number[]>([]);
  const colors = budgets
    .filter((item) => item.balance - item.used > 0)
    .map((item, index) => IconBudgetSystem[item.name].color);

  const font = useFont(require("./fonts/Roboto-Bold.ttf"), 28);
  const smallFont = useFont(require("./fonts/Roboto-Light.ttf"), 20);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const handleClickDetail = () => {
    setIsDetailVisible(!isDetailVisible);
  };
  useEffect(() => {
    if (font && smallFont) {
      setFontsLoaded(true);
      generateData();
    }
  }, [font, smallFont, budgets]);

  const generateData = () => {
    const arrayOfObjects = budgets
      .filter((item) => item.balance - item.used > 0)
      .map((item, index) => ({
        name: item.name,
        value: item.balance - item.used,
        color: colors[index],
      }));
    const generateNumbers = arrayOfObjects.map((item) => item.value);
    const total = arrayOfObjects.reduce((acc, item) => acc + item.value, 0);

    const generatePercentages = calculatePercentage(generateNumbers, total);
    const generateDecimals = generatePercentages.map(
      (number) => Number(number.toFixed(0)) / 100
    );

    totalValue.value = withTiming(total, { duration: 1000 });
    decimals.value = [...generateDecimals];

    const dataChart = arrayOfObjects.map((item, index) => ({
      name: item.name,
      value: item.value,
      percentage: generatePercentages[index],
      color: item.color,
    }));

    setData(dataChart);
  };

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chartContainer}>
          <DonutChart
            radius={RADIUS}
            gap={GAP}
            strokeWidth={STROKE_WIDTH}
            outerStrokeWidth={OUTER_STROKE_WIDTH}
            font={font}
            smallFont={smallFont}
            totalValue={totalValue}
            n={n}
            decimals={decimals}
            colors={colors}
          />
        </View>
        <TouchableOpacity onPress={handleClickDetail} style={styles.button}>
          <Text style={styles.buttonText}>
            {isDetailVisible ? "Ẩn chi tiết" : "Xem chi tiết"}
          </Text>
        </TouchableOpacity>
        {isDetailVisible &&
          data.map((item, index) => (
            <RenderItem item={item} key={index} index={index} />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chartContainer: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    marginTop: 10,
  },
  button: {
    marginVertical: 30,
    backgroundColor: "#f4f7fc",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: ColorSystem.primary[600],
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default DonutChartContainer;
