import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { verticalScale } from "../Utils/scalingMetrics";

const IntroPage = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: verticalScale(50), alignItems: "center" }}
    >
      <Text>Documentation is here...</Text>
    </SafeAreaView>
  );
};

export default IntroPage;
