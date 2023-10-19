import React, { useEffect, useContext, useState } from "react";
import {
   Text,
   View,
   TextInput,
   TouchableOpacity,
   Image,
   Modal,
} from "react-native";

import app from "../../../../../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "../../../../../config/colors";
import style from "./style";

export default function Logo() {
   const context = useContext(app);
   const { appInfo } = context;

   const [textModal, setTextModal] = useState(false);
   const [userName, setUserName] = useState("Visitante");
   const [description, setDescription] = useState("Olá, seja bem vindo!");

   const [isNameEditable, setIsNameEditable] = useState(false);
   const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);

   const [newName, setNewName] = useState("Anderson Leandro");
   const [newDescription, setNewDescription] = useState("Esse é o meu perfil do emmiter.");

   useEffect(() => {
      // Recupera os valores do AsyncStorage.
      async function fetchDataFromAsyncStorage() {
         try {
            // Recupera os valores do AsyncStorage
            const NAME = await AsyncStorage.getItem("username");
            const DESCRIPTION = await AsyncStorage.getItem("userdescription");

            // Verifica se os valores são válidos (não nulos)
            if (NAME !== null && DESCRIPTION !== null) {
               setUserName(NAME);
               setDescription(DESCRIPTION);
            }
         } catch (error) {
            console.log("Erro ao recuperar dados do AsyncStorage: ", error);
         }
      }
      // Chama a função para recuperar os dados quando o componente é montado.
      fetchDataFromAsyncStorage();
   }, []);

   const handleSaveChanges = async () => {
      try {
         // Atualiza o estado com os novos valores.
         setUserName(newName);
         setDescription(newDescription);

         // Atualiza o AsyncStorage com os novos valores.
         await AsyncStorage.setItem("username", newName);
         await AsyncStorage.setItem("userdescription", newDescription);

         // Fecha o modal
         setTextModal(false);
         setIsNameEditable(false);
         setIsDescriptionEditable(false);

         // Quando salvar o nome, verifica se o nome tem a quantidade ideal de caracteres e salva, se possuir
         // mais de que o limite de caracteres emite uma mensagem de alerta.
      } catch (error) {
         console.log("Erro ao armazenar os novos dados do usuário: ", error);
      }
   };

   return (
      <>
         <View style={style.LogoBox}>
            {/* Foto do usuário */}
            <TouchableOpacity style={style.imageButton}>
               <Image
                  source={require("../../../../../../img/bird.jpg")}
                  style={{ width: 80, height: 80, borderRadius: 50 }}
               />
            </TouchableOpacity>

            {/* Nome e descrição do usuário */}
            <TouchableOpacity onLongPress={() => setIsNameEditable(true)}>
               {isNameEditable ?
                  <View style={style.characterCounterFloatBox}>
                     <Text style={style.characterCounter} >{newName.length + '/20'}</Text>
                     <TouchableOpacity onPress={() => handleSaveChanges()} style={style.checkButton}>
                        <AntDesign name="check" size={10} color={colors.wh0} />
                     </TouchableOpacity>
                  </View>
               : null }

               <TextInput 
                  editable={isNameEditable} 
                  onChangeText={(text) => { text.length >= 4 && text.length <= 15 ? setNewName(text) : null }} // Suporta o min. de 4 caracteres e o máx. de 15 caracteres
                  style={{...style.nameText, color: isNameEditable ? colors.bk0 : colors.wh0, backgroundColor: isNameEditable ? colors.wh0 : null}}
               >
                  {userName}
               </TextInput>
            </TouchableOpacity>
               
            <TouchableOpacity onLongPress={() => setIsDescriptionEditable(true)}>
               {isDescriptionEditable ?
                  <View style={style.characterCounterFloatBox}>
                     <Text style={style.characterCounter} >{newDescription.length + '/35'}</Text>
                     <TouchableOpacity onPress={() => handleSaveChanges()} style={style.checkButton}>
                        <AntDesign name="check" size={10} color={colors.wh0} />
                     </TouchableOpacity>
                  </View>
               : null }

               <TextInput 
                  editable={isDescriptionEditable}
                  onChangeText={(text) => {
                     // Suporta o min. de 15 caracteres e o máx. de 40 caracteres
                     text.length >= 15 && text.length <= 40 ? setNewDescription(text) : null
                  }}
                  style={{...style.descriptionText, color: isDescriptionEditable ? colors.bk0 : colors.wh0, backgroundColor: isDescriptionEditable ? colors.wh0 : null}}
               >
                  {description}
               </TextInput>
            </TouchableOpacity>

            {/* Badge: nome do aplicativo */}
            <View style={{ ...style.appBadge, width: 85, top: 5, right: 5 }}>
               <AntDesign name="info" size={14} color={colors.wh0} />
               <Text style={{ color: colors.wh0 }}>{appInfo.name}</Text>
            </View>

            {/* Badge: versão do aplicativo */}
            <View style={{ ...style.appBadge, width: 75, top: 32, right: 5 }}>
               <AntDesign name="tago" size={14} color={colors.wh0} />
               <Text style={{ color: colors.wh0 }}>{appInfo.version}</Text>
            </View>

            {/* Botão: Logout */}
            <TouchableOpacity style={{ ...style.appBadge, width: 35, height: 35, borderRadius: 50, top: 10, left: 10 }}>
               <AntDesign name="logout" size={14} color={colors.wh0} />
            </TouchableOpacity>
         </View>

         {/* Modal de alteração de nome e descrição */}
         <Modal animationType="fade" transparent={true} visible={textModal}>
            {/* Input: Nome */}
            <View style={style.boxModal}>
               <TextInput
                  placeholder="Novo nome de usuário (de 4 a 15 caracteres máx.)"
                  placeholderTextColor={colors.bk1}
                  onChangeText={(text) => {
                     // Suporta o min. de 4 caracteres e o máx. de 15 caracteres
                     text.length >= 4 && text.length <= 15 ? setNewName(text) : null
                  }}
                  style={style.input}
               />

               {/* Input: Descrição */}
               <TextInput
                  placeholder="Descrição (de 15 a 40 caracteres máx.)"
                  placeholderTextColor={colors.bk1}
                  onChangeText={(text) => {
                     // Suporta o min. de 15 caracteres e o máx. de 40 caracteres
                     text.length >= 15 && text.length <= 40 ? setNewDescription(text) : null
                  }}
                  style={style.input}
               />

               <View style={style.buttonBox}>
                  {/* Botão de voltar do modal */}
                  <TouchableOpacity onPress={() => setTextModal(false)} style={style.backButton}>
                     <AntDesign name="back" size={14} color={colors.bk1} />
                     <Text style={{ paddingLeft: 5, color: colors.bk1 }}>Voltar</Text>
                  </TouchableOpacity>

                  {/* Botão de alterar do modal */}
                  <TouchableOpacity onPress={() => handleSaveChanges()} style={style.changeButton}>
                     <AntDesign name="save" size={14} color={colors.wh0} />
                     <Text style={{ paddingLeft: 5, color: colors.wh0 }}>Alterar</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Modal>
      </>
   );
};