import React from "react";
import RootNavigation from "./navigation";
import { LogBox } from "react-native";
import { useFonts } from "expo-font";
import { typography } from "./typography";
export default function App() {
  const [loaded] = useFonts({
    Ubuntu: require("./assets/fonts/Ubuntu-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
  LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component."]);
  typography();
  return <RootNavigation />;
}
