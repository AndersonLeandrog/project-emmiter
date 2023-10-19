import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "../../../../../config/colors";
import styles from "./style";

export default function Shortcuts() {
   const navigation = useNavigation();

   return (
      <View style={{ ...styles.options }}>
         <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center"
            }}
         >
            {/* Atalho de adicionar usuários */}
            <TouchableOpacity
               onPress={() => navigation.navigate("Add")}
               style={{ ...styles.items, marginLeft: 15, backgroundColor: colors.wh1 }}
            >
               <AntDesign name="adduser" size={24} color={colors.bk0} />
               <Text style={{ color: colors.bk0 }}>{"  Adicionar\n  Usuário"}</Text>
            </TouchableOpacity>

            {/* Atalho de gerenciar usuários */}
            <TouchableOpacity
               onPress={() => navigation.navigate("List")}
               style={{ ...styles.items, marginLeft: 10, backgroundColor: colors.wh1 }}
            >
               <AntDesign name="inbox" size={24} color={colors.bk0} />
               <Text style={{ color: colors.bk0 }}>{"  Gerenciar\n  Usuários"}</Text>
            </TouchableOpacity>

            {/* Atalho de editar usuários */}
            <TouchableOpacity
               onPress={() => navigation.navigate("List")}
               style={{ ...styles.items, marginLeft: 10, backgroundColor: colors.wh1 }}
            >
               <AntDesign name="edit" size={24} color={colors.bk0} />
               <Text style={{ color: colors.bk0 }}>{"  Editar um\n  Usuário"}</Text>
            </TouchableOpacity>

            {/* Atalho de remover usuários */}
            <TouchableOpacity
               onPress={() => navigation.navigate("List")}
               style={{ ...styles.items, marginLeft: 10, backgroundColor: colors.wh1 }}
            >
               <AntDesign name="deleteuser" size={24} color={colors.bk0} />
               <Text style={{ color: colors.bk0 }}>{"  Remover\n  usuário"}</Text>
            </TouchableOpacity>
         </ScrollView>
      </View>
   );
};