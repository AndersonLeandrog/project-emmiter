import React from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "../config/colors";
import style from "./style";

export default function ScreenB({ navigation }) {
   async function sendDataToAsyncStorage(screen) {
      await AsyncStorage.setItem("showSplashScreen", screen);
      navigation.navigate("Home");
   };

   return (
      <>
         <StatusBar
            backgroundColor={colors.wh0}
            barStyle={"dark-content"}
         />

         <View style={style.container}>
            <View style={{ width: "100%", backgroundColor: colors.wh0, flex: 1 }}>
               <Text style={{ fontSize: 23, color: colors.bk0, paddingLeft: 20, paddingTop: 50 }}>
                  {"Essa é a sua chave,\nanote a sua chave de login!"}
               </Text>

               <Text style={{ fontSize: 16, color: colors.bk0, paddingLeft: 20, paddingRight: 20, paddingTop: 15 }}>
                  {
                     "Anote a sua chave!\n\n" +
                     "Abaixo disponibilizamos uma chave padrão de autenticação, como este projeto ainda está em fase de desenvolvimento ainda estamos resolvendo algumas coisas...\n\n" +
                     "Esse será o seu login e senha, se preferir anote para que não tenha problemas no futuro, essa chave vai garantir que só você possa ter acesso direto ao painel de gerenciamento de cliente do aplicativo."
                  }
               </Text>

               <View style={{ width: "100%", height: 250, marginTop: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <AntDesign name="key" size={64} color={colors.bk0} />
                  <Text style={{ fontSize: 16, color: colors.bk0, paddingLeft: 20, paddingTop: 15 }}>{"email: admin@admin.com\nsenha: admin"}</Text>
               </View>
            </View>

            <TouchableOpacity
               onPress={() => sendDataToAsyncStorage("Home")}
               style={{ ...style.button, width: 120 }}
            >
               <AntDesign name="check" size={24} color={colors.wh0} />
               <Text style={{ color: colors.wh0 }}>  Finalizar</Text>
            </TouchableOpacity>
         </View>
      </>
   );
};
