import React, { useContext } from "react";
import { Text, View } from "react-native";
import app from "../../../../../../context";

import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "../../../../../config/colors";
import styles from "./style";

export default function Social() {

   // Obtém informações do contexto global, são utilizadas
   // para passar os dados entre os componentes.
   const context = useContext(app);
   const { appSocialInfo } = context;

   return (
      <View style={{ ...styles.socialContainer }}>
         <View style={{ ...styles.socialBox }}>
            <AntDesign name="github" size={24} color={colors.bk0} />
            <Text style={styles.socialText}>
               {appSocialInfo.github}
            </Text>

            <AntDesign name="facebook-square" size={24} color={colors.bk0} />
            <Text style={styles.socialText}>
               {appSocialInfo.facebook}
            </Text>
         </View>

         <View style={{ ...styles.socialBox, marginTop: 5 }}>
            <AntDesign name="twitter" size={24} color={colors.bk0} />
            <Text style={styles.socialText}>
               {appSocialInfo.twitter}
            </Text>
         </View>
      </View>
   );
};