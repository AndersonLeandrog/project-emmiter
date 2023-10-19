import React, { useEffect, useContext } from "react";
import { Text, View, Image, StatusBar } from "react-native";

import app from "../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../config/colors";
import style from "./style";

export default function ScreenA({ navigation }) {
   const context = useContext(app);
   const { appInfo } = context;

   useEffect(() => {
      // Função para mudar de tela 
      // Quando o app é iniciado pela primeira vez ele mostrará a tela de boas vindas,
      // caso o app já tenha sido iniciado ele mostrará a tela "Home".
      (async function switchToScreen() {
         // Obtém o valor da tela inicial (showSplashScreen)
         const screen = await AsyncStorage.getItem("showSplashScreen");

         // A logo é exibida por 5s e em seguida verifica se a tela é igual a "Home",
         // se a tela retorna o valor "Home" após a logo ser exibida a tela Home será carregada
         // senão a tela retorna  o valor "ScreenA" após a logo ser exibida a tela ScreenA será carregada.
         setTimeout(() => {
            if (screen === "Home") {
               navigation.navigate("Home");
            } else {
               navigation.navigate("ScreenA");
            }
         }, 5000);
      })();
   }, []);

   return (
      <>
         <StatusBar
            backgroundColor={colors.wh0}
            barStyle={"dark-content"}
         />
         <View style={{ ...style.container, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Image source={require("../../img/emmiter-icon.png")} style={{ width: 75, height: 75 }} />
            <Text style={{ paddingTop: 15, color: colors.bk1 }}>{appInfo.version}</Text>
         </View>
      </>
   );
};