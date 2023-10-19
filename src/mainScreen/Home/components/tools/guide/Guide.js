import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "../../../../../config/colors";
import style from "./style";

export default function Guide() {
   const [box, setBox] = useState(true);
   const [containerHeight, setContainerHeight] = useState(180); // height padrão do container
   const [iconName, setIconName] = useState("arrowup");

   function guideBox() {
      return (
         <View style={style.guideBox}>
            <Text style={style.title}>{"Este é o seu guia do usuário!"}</Text>
            <Text style={style.text}>
               {
                  "✦ Dê um longo toque sobre o seu nome para inserir um nome personalizado." + "\n\n" +
                  "✦ Dê um longo toque sobre a sua descrição para inserir uma descrição personalizada." + "\n\n" +
                  "✦ Faça um log-out tocando no ícone superior da esquerda." + "\n" +
                  "✦ Faça um log-out tocando no ícone superior da esquerda."
               }
            </Text>
         </View>
      );
   };

   return (
      <View style={{ ...style.container, height: containerHeight }}>
         {box ? guideBox() : <View style={style.guideBox}><Text style={{ ...style.title, fontSize: 12 }}>{"Toque na seta para expandir o guia."}</Text></View>}

         <TouchableOpacity
            onPress={() => {
               setBox(!box);

               if (box) {
                  setIconName("arrowdown");
                  setContainerHeight(35);
               } else {
                  setIconName("arrowup");
                  setContainerHeight(180);
               }
            }}
            style={style.button}
         >
            <AntDesign name={iconName} size={16} color={colors.wh0} />
         </TouchableOpacity>
      </View>
   );
};