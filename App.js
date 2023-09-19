import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Tabs from "./navigation/tabs";
import BtnSearch from "./navigation/BtnSearch";
import BtnBack from "./navigation/BtnBack";
import BtnOptions from "./navigation/BtnOptions";
import BtnNotifications from "./navigation/BtnNotifications";
import { COLORS } from "./constants/";
import hasNotch from "./utils/hasNotch";
import { Text } from "./components/";
import Read from "./screens/Read";
import {
  SignIn,
  SignUp,
  ResetPassword,
  Search,
  Notifications,
  Comments,
  NewMessage,
  NewEvent,
  NewEventMap,
  Chat,
  Video,
  Friends,
  Account,
  User,
  Settings,
  EditAccount,
  NewStory,
} from "./screens/";

const HEADER_HEIGHT = hasNotch() ? 122 : 96;
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.lightGray,
    border: "transparent",
    card: COLORS.white,
  },
};

const authOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardStyle: { backgroundColor: COLORS.white },
};

const screenOptions = {
  gestureEnabled: false,
  headerStyle: {
    height: HEADER_HEIGHT,
    shadowRadius: 5,
    shadowOpacity: 0.15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    elevation: 1,
  },
  headerTitle: ({ children }) => (
    <Text center bold caption transform="uppercase">
      {children}
    </Text>
  ),
  headerRight: () => <BtnOptions />,
};

const tabsOptions = () => ({
  title: "Home",
  gestureEnabled: false,
  headerStyle: {
    height: HEADER_HEIGHT,
    shadowRadius: 5,
    shadowOpacity: 0.15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    elevation: 1,
  },
  headerTitle: ({ children }) => (
    <Text center bold caption transform="uppercase">
      {children}
    </Text>
  ),
  headerLeft: () => <BtnSearch />,
});

export default () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        {/* auth screens */}
        <Stack.Screen name="SignIn" component={SignIn} options={authOptions} />
        <Stack.Screen name="SignUp" component={SignUp} options={authOptions} />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={authOptions}
        />
        {/* tabs */}
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={(props) => tabsOptions(props)}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={(props) => ({
            ...screenOptions,
            ...props,
            headerRight: null,
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
          })}
        />
        <Stack.Screen
          name="Friends"
          component={Friends}
          options={(props) => ({
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
            ...screenOptions,
            ...props,
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={(props) => ({
            ...screenOptions,
            ...props,
            headerRight: () => (
              <BtnOptions color="transparent" iconColor={COLORS.gray} />
            ),
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
          })}
        />
        <Stack.Screen
          name="Read"
          component={Read}
          options={(props) => ({
            ...screenOptions,
            ...props,
            headerRight: null,
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
          })}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={(props) => ({
            ...screenOptions,
            ...props,
            headerRight: () => (
              <BtnOptions color="transparent" iconColor={COLORS.gray} />
            ),
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
          })}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{
            headerStyle: { height: HEADER_HEIGHT },
            headerRight: () => <BtnOptions iconColor={COLORS.black} />,
            headerLeft: ({ onPress }) => {
              return <BtnBack black onPress={(event) => onPress(event)} />;
            },
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={(props) => ({
            ...screenOptions,
            ...props,
            headerRight: null,
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
          })}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={(props) => ({
            ...screenOptions,
            ...props,
            headerRight: null,
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
          })}
        />
        <Stack.Screen
          name="NewEvent"
          component={NewEvent}
          options={(props) => ({
            ...screenOptions,
            ...props,
            title: "Add Event",
            headerRight: null,
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
          })}
        />
        <Stack.Screen
          name="NewEventMap"
          component={NewEventMap}
          options={(props) => ({
            ...screenOptions,
            ...props,
            title: "Add Location Pin",
            headerRight: null,
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
          })}
        />
        <Stack.Screen
          name="NewMessage"
          component={NewMessage}
          options={(props) => ({
            ...screenOptions,
            ...props,
            headerRight: null,
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
          })}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={(props) => ({
            ...screenOptions,
            ...props,
            headerStyle: {
              ...screenOptions.headerStyle,
              backgroundColor: COLORS.black,
            },
            headerRight: () => (
              <BtnOptions color="transparent" iconColor={COLORS.gray} />
            ),
            headerLeft: () => (
              <BtnBack
                white
                onPress={() => props?.navigation?.navigate("Messages")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Video"
          component={Video}
          options={(props) => ({
            ...screenOptions,
            ...props,
            title: null,
            headerTransparent: true,
            headerRight: null,
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
          })}
        />
        <Stack.Screen
          name="EditAccount"
          component={EditAccount}
          options={(props) => ({
            ...screenOptions,
            ...props,
            title: null,
            headerRight: null,
            headerLeft: ({ onPress }) => (
              <BtnBack onPress={(event) => onPress(event)} />
            ),
          })}
        />
        <Stack.Screen
          name="NewStory"
          component={NewStory}
          options={(props) => ({
            ...props,
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
