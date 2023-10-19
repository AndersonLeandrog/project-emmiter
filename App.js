import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "./src/config/colors";

import LoadIcon from "./src/splashScreen/LoadIcon";
import ScreenA from "./src/splashScreen/Screen1";
import ScreenB from "./src/splashScreen/Screen2";
import Home from "./src/mainScreen/Home";
import AddUser from "./src/mainScreen/Add";
import UserList from "./src/mainScreen/List";
import Details from "./src/mainScreen/Details";

export default function App() {
  const [initialRoute, setInitialRoute] = useState("LoadIcon");

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);

    (async function getAsyncStorageData() {
      const splashScreen = await AsyncStorage.getItem("showSplashScreen");
      if (splashScreen === "Home") {
        setInitialRoute("Home");
      }
    })();

    return () => BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="LoadIcon" component={LoadIcon} options={{ headerShown: false }} />
        <Stack.Screen name="ScreenA" component={ScreenA} options={{ headerShown: false }} />
        <Stack.Screen name="ScreenB" component={ScreenB} options={{ headerShown: false }} />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Painel de Controle",
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Add"
          component={AddUser}
          options={{
            title: "Adicionar um novo usuário",
            headerTintColor: colors.wh0,
            headerStyle: {
              backgroundColor: colors.bl0,
            }
          }}
        />

        <Stack.Screen
          name="List"
          component={UserList}
          options={{
            title: "Lista de usuários",
            headerTintColor: colors.wh0,
            headerStyle: {
              backgroundColor: colors.bl0,
            }
          }}
        />

        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Detalhes do usuário",
            headerTintColor: colors.wh0,
            headerStyle: {
              backgroundColor: colors.bl0,
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
