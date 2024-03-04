import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/screens/DashboardPage" />
      <Stack.Screen options={{ headerShown: true }} name="/screens/IntroPage" />
    </Stack>
  );
};

export default Layout;
