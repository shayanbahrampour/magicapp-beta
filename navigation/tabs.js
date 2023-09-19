import React from "react";
import { Utils } from "expo-ui-kit";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Text } from "../components/";
import { COLORS } from "../constants/";
import hasNotch from "../utils/hasNotch";
import { getHeaderTitle, getHeaderButtons } from "../utils/helpers";

// import screens
import { Home, Events, MyProfile } from "../screens/"; // Removed "Messages"

const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
  activeBackgroundColor: COLORS.white,
  inactiveBackgroundColor: Utils.rgba(COLORS.gray, 0.2),
  style: {
    backgroundColor: COLORS.primary,
    height: hasNotch() ? 122 : 96,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    alignItems: "center",
    paddingTop: 25,
    // shadow
    shadowRadius: 5,
    shadowOpacity: 0.15,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  tabStyle: {
    borderRadius: 12,
    maxHeight: 38,
    minHeight: 38,
    maxWidth: 38,
    marginHorizontal: 16,
  },
};

const Tabs = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (
        <Text center bold caption transform="uppercase">
          {getHeaderTitle(route)}
        </Text>
      ),
      ...getHeaderButtons({ navigation, route }),
    });
  }, [navigation, route]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.white;
          switch (route.name) {
            case "Home":
              return (
                <Icon name="home" color={tintColor} resizeMode="contain" />
              );

            case "Explore":
              return (
                <Icon name="search" color={tintColor} resizeMode="contain" />
              );


            case "MyProfile":
              return (
                <Icon name="user" color={tintColor} resizeMode="contain" />
              );
          }
        },
      })}
      tabBarOptions={tabOptions}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Events} />
      <Tab.Screen name="MyProfile" component={MyProfile} />
    </Tab.Navigator>
  );
};

export default Tabs;
