import { Keyboard, StatusBar, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { theme } from "../constants";

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e) {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
    return () => {
      Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
    };
  }, []);

  return [keyboardHeight];
};

export const useTheme = () => {
  return theme;
};

export const useStaturBar = (style = "dark-content") => {
  useFocusEffect(() => {
    StatusBar.setBarStyle(style); // light-content

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(`rgba(0, 0, 0, 0)`);
      StatusBar.setTranslucent(true);
    }
  });
};
