import React, { useState, useEffect } from "react";
import {
   Text,
   View,
   SafeAreaView,
   FlatList,
   TouchableOpacity
} from "react-native";

import firestore from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "../../config/colors";
import styles from "./style";

export default function UserList({ navigation }) {
   const [recoveredData, setRecoveredData] = useState([]);

   useEffect(() => {
      const recoveryData = async (user) => {
         const querySnapshot = await getDocs(collection(firestore, user));
         const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
         setRecoveredData(usersData);

         // Verifica o número de usuários que já foram cadastrados
         // armazena o número de usuários cadastrados no AsyncStorage (Serão retornados na tela Home)
         const totalUsersNumber = usersData.length; // Calcula o número de usuários cadastrados

         // Verifica o número de usuários masculinos e femininos que já foram cadastrados
         // armazena o número de usuários masculinos e femininos que já foram cadastrados no AsyncStorage
         usersData.forEach(async (number, index) => {
            const userBySex = usersData[index].gender;
            if (userBySex === "masculino" || userBySex === "Masculino") {
               await AsyncStorage.setItem("totalMasculineUsersNumber", String(index));
            } else if (userBySex === "feminino" || userBySex === "Feminino") {
               await AsyncStorage.setItem("totalFeminineUsersNumber", String(index));
            }
         });
      };
      recoveryData("user");
   }, []);

   // Envia o id do usuário selecionado para a tela de "Detalhes",
   // na tela de "Detalhes" esse id é procurado no firestorage e é exibido
   // a informação completa do usuário que foi selecionado passando o id

   // O id é definido no AsyncStorage e fica disponível globalmente para toda
   // a aplicação através do método getItem() do AsyncStorage
   async function sendDataToDetails(id) {
      try {
         await AsyncStorage.setItem("id", id);
         navigation.navigate("Details");
      } catch (error) {
         console.log("Erro ao definir o id no AsyncStorage: ", error);
      }
   };

   function loadList() {
      return (
         <>
            <View style={{ width: "85%", marginTop: 50, display: "flex", flexDirection: "row" }}>
               <View style={styles.boxInfo}>
                  <AntDesign name="info" size={16} color={colors.wh0} />
               </View>

               <Text style={styles.info}>
                  {"Abaixo estão listados todos os usuários já cadastrados no aplicativo, toque sobre algum usuário para começar a gerenciar."}
               </Text>
            </View>

            <FlatList
               data={recoveredData}
               keyExtractor={item => item.id}
               renderItem={({ item }) => (
                  <TouchableOpacity
                     onPress={() => {
                        sendDataToDetails(item.id);
                     }}
                     style={{
                        width: "100%",
                        marginTop: 5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                     }}
                  >
                     <View style={styles.flatListContainer}>
                        <View style={styles.iconContainer}>
                           <AntDesign name="solution1" size={24} color={colors.bk0} />
                        </View>

                        <View>
                           <Text
                              style={{
                                 color: colors.bl0,
                                 paddingTop: 10,
                                 paddingLeft: 10
                              }}>{"ID: " + item.id}</Text>
                           <Text style={{ paddingLeft: 10, paddingBottom: 10, color: colors.bk0 }}>{"Nome: " + item.name}</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               )}
               style={{ width: "90%", marginTop: 30 }}
            />
         </>
      )
   };

   // Retorna o componente caso 
   function loadListError() {
      return (
         <View
            style={{
               display: "flex",
               flexDirection: "colunm",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <AntDesign name="meh" size={64} color={colors.bk0} />
            <Text style={{ fontStyle: "italic", color: colors.bk0, paddingTop: 25, textAlign: "center" }}>
               {
                  "Não há nada aqui!\n" +
                  "Para adicionar um usuário,\n" +
                  "volte até a tela inicial e em (Atalhos)\n" +
                  "toque em (Adicionar usuário)\n"
               }
            </Text>
         </View>
      )
   };

   return (
      <SafeAreaView>
         <View style={styles.container}>
            {recoveredData.length > 0 ? loadList() : loadListError()}
         </View>
      </SafeAreaView>
   );
};
