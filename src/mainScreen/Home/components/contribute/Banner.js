import React from "react";
import { Text, View } from "react-native";

import GithubLink from "./GithubLinking";
import PixLink from "./PixLinking";
import Qr from "./QrCode";

import colors from "../../../../config/colors";
import styles from "../../style";

export default function Banner() {
   return (
      <View style={styles.banner}>
         <View style={styles.bannerContainer}>
            <Text
               style={{
                  textAlign: "left",
                  fontSize: 14,
                  paddingBottom: 5,
                  color: colors.bk0,
               }}
            >
               {"Escaneie o QR e \ncontribua para o projeto!"}
            </Text>
            <GithubLink />
            <PixLink />
         </View>
         <View style={styles.bannerQrContainer}><Qr /></View>
      </View>
   );
};