import React from "react";
import { View, Image } from "react-native";
import colors from "../../../../config/colors";

export default function Qr() {
   return (
      <View
         style={{
            width: 160,
            height: 160,
            backgroundColor: colors.wh0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
         }}
      >
         <Image
            source={require("../../../../../img/qrcode.png")}
            style={{ width: 150, height: 150, padding: 10 }}
         />
      </View>
   );
};