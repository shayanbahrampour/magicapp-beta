import React, { useEffect, useState } from "react";
import { Text as ExpoText } from "expo-ui-kit";
import * as Font from "expo-font";

import theme from "../constants/theme";

export default ({ children, ...props }) => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    async function loadCustomFonts() {
      await Font.loadAsync({
        "Yekan-Regular": require("../assets/fonts/YekanBakh-Regular.ttf"),
        "Yekan-Bold": require("../assets/fonts/YekanBakh-Bold.ttf"),
        "Yekan-SemiBold": require("../assets/fonts/YekanBakh-SemiBold.ttf"),
        "Yekan-Light": require("../assets/fonts/YekanBakh-Light.ttf"),
      });

      setIsFontLoaded(true);
    }

    loadCustomFonts();
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <ExpoText
      {...props}
      style={[
        { fontFamily: `Yekan-${[props.weight || "Regular"]}` },
        props.style,
      ]}
    >
      {children}
    </ExpoText>
  );
};
