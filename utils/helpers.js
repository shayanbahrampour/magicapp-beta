import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// navigation buttons
import BtnSearch from "../navigation/BtnSearch";
export const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Explore":
      return "Explore";
    case "Messages":
      return "Messages";
    default:
      return "Home"; // Default to 'Home' if the route name is not recognized.
  }
};

export const getHeaderButtons = ({ route }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return {
        headerShown: true,
        headerLeft: () => <BtnSearch />,
      };
    case "Explore":
      return {
        headerShown: true,
        headerLeft: () => <BtnSearch />,
      };
    case "Messages":
      return {
        headerShown: true,
        headerLeft: () => <BtnSearch />,
      };
    case "MyProfile":
      return {
        headerShown: false,
      };
    case "NewPost":
      return {
        headerShown: false,
      };
    default:
      return {
        headerShown: true,
        headerLeft: () => <BtnSearch />,
      };
  }
};
