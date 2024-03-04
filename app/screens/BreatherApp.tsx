import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { verticalScale } from "../Utils/scalingMetrics";

const BreatherApp = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: verticalScale(50), alignItems: "center" }}
    >
      <Text>BreatherApp</Text>
    </SafeAreaView>
  );
};

export default BreatherApp;
