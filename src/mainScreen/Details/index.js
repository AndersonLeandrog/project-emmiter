import React, { useState, useEffect, useRef } from "react";
import {
   Text,
   View,
   TextInput,
   TouchableOpacity,
   SafeAreaView,
   ScrollView,
} from "react-native";

import firestore from "../../config/firebase";
import { collection, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RNFS from "react-native-fs";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import QRCode from "react-native-qrcode-svg";

import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "../../config/colors";
import styles from "./style";

export default function Details({ navigation }) {
   const [recoveredData, setRecoveredData] = useState("");
   const [recoveredId, setRecoveredId] = useState("");
   const [isEditable, setisEditable] = useState(false);
   const [isRegister, setIsRegister] = useState(false);
   const [generatedImageURI, setGeneratedImageURI] = useState("");

   const [noteName, setNoteName] = useState("Título/Nome da sua nota! ");
   const [isNoteNameEditable, setIsNoteNameEditable] = useState(false);
   const [noteTitleCount, setNoteTitleCount] = useState(20);

   const [descriptionName, setDescriptionName] = useState("Essa é a descrição do seu negócio, insira aqui informações úteis sobre o seu negócio ou sobre garantias ou quaisquer outras informações que desejar, seja criativo!");
   const [isDescriptionNameEditable, setIsDescriptionNameEditable] = useState(false);
   const [noteTextCount, setNoteTextCount] = useState(135);

   const clientRef = collection(firestore, "user");
   const viewShotRef = useRef();

   useEffect(() => {
      (async function getDataFromAsyncStorage() {
         // Realiza a consulta pelo id no AsyncStorage.
         try {
            const data = await AsyncStorage.getItem("id");
            recoveryData(data);
         } catch (error) {
            console.log("Erro ao obter o id do usuário selecionado: ", error);
         }

         // Obtém o nome da nota e a descrição passada para o AsyncStorage e realiza a 
         // alteração do nome da nota e da descrição no app.
         try {
            const storedNoteName = await AsyncStorage.getItem("noteName");
            const storedDescriptionName = await AsyncStorage.getItem("descriptionName");
            storedNoteName.length > 0 ? setNoteName(storedNoteName) : setNoteName(noteName)
            storedDescriptionName.length > 0 ? setDescriptionName(storedDescriptionName) : setDescriptionName(descriptionName)
         } catch (error) {
            console.log("Erro ao obter ou armazenar o nome da nota:", error);
         }
      })();

      // Realiza uma consulta no FireStorage e retorna os dados do usuário selecionado.
      async function recoveryData(users) {
         try {
            const userDocRef = doc(clientRef, users);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
               const userData = userDocSnapshot.data();
               setRecoveredData(userData);
               setRecoveredId(users);
            } else {
               console.log("Documento não encontrado!");
            }
         } catch (error) {
            console.log("Erro ao recuperar os dados: ", error);
         }
      };

      // Gera o código QR do usuário selecionado.
      (async function screenShotCapture() {
         try {
            const uri = await viewShotRef.current.capture(); // Captura os componentes dentro da ViewShot
            setGeneratedImageURI(uri); // Atribui a imagem capturada do componente ao componente de Imagem
         } catch (error) {
            console.log("Erro ao capturar a imagem: ", error);
         }
      })();
   }, []);

   // Editar um usuário cadastrado.
   const updatedUserData = {};
   const editUserSelected = async (updatedUserData) => {
      try {
         const userId = await AsyncStorage.getItem("id"); // Obtém o id do usuário selecionado
         const userDocRef = doc(clientRef, userId); // Verifica o id no firebase
         const userDocSnapshot = await getDoc(userDocRef); // Obtém os dados do id do usuário selecionado

         // Se os dados existirem os dados atuais serão substituídos pelos novos dados
         if (userDocSnapshot.exists()) {
            const existingUserData = userDocSnapshot.data();
            const updatedData = { ...existingUserData, ...updatedUserData };
            await setDoc(userDocRef, updatedData);
            console.log("Usuário foi editado com sucesso!");
         } else {
            console.log("O Documento não foi encontrado.");
         }
      } catch (error) {
         console.log("Erro ao editar o usuário: ", error);
      }
      setisEditable(false);
   };

   // Função remove o usuário da lista de usuários no app.
   async function removeUserById() {
      try {
         const userId = await AsyncStorage.getItem("id");
         const userDocRef = doc(clientRef, userId);
         const userDocSnapshot = await getDoc(userDocRef);
         if (userDocSnapshot.exists()) {
            await deleteDoc(userDocRef);
            await AsyncStorage.setItem("removedId", userId);
            navigation.navigate("List");
            console.log("Usuário removido com sucesso");
         } else {
            console.log("Documento não foi encontrado");
         }
      } catch (error) {
         console.log("Erro ao remover o usuário: ", error);
      }
   };

   // Compartilhar a imagem da nota capturada.
   // salva no armazenamento do aplicativo em: 0/android/data/com.emmiter/files/*imagem.png*
   async function shareImage() {
      try {
         // Abre a opção de compartilhar passando as propriedades do Objeto 
         await Share.open({
            title: "Arquivo de nota do Emmiter",
            url: generatedImageURI,
            type: "image/png",
         });
      } catch (error) {
         console.log("Houve um erro ao compartilhar a imagem: ", error);
      }

      // Salva a imagem no armazenamento do aparelho
      try {
         // Gera um nome aleatório para a imagem
         const randomNumber = Math.floor(Math.random() * 10000) + 1;

         // Especifica a pasta para o local em que a imagem será salva.
         const filePath = RNFS.ExternalDirectoryPath + "/SCREENSHOT_EMMITER_" + randomNumber + ".png";

         // Move a imagem capturada para o caminho do arquivo especificada.
         RNFS.moveFile(generatedImageURI, filePath);
      } catch (error) {
         console.log("Houve um erro ao salvar a imagem: ", error);
      }
   };

   // Salva todas as alterações do usuário feitas em detalhes do usuário no Asyncstorage
   async function saveChangesToAsyncStorage() {
      setNoteTitleCount(noteName.length);
      setNoteTextCount(descriptionName.length);
      noteName.length > 24 ? setIsNoteNameEditable(false) : await AsyncStorage.setItem("noteName", noteName);
      descriptionName.length > 135 ? setIsDescriptionNameEditable(false) : await AsyncStorage.setItem("descriptionName", descriptionName);
   };

   return (
      <SafeAreaView>
         <ScrollView>
            <View style={styles.container}>
               <View style={{ width: "85%", marginTop: 50, display: "flex", flexDirection: "row" }}>
                  <View style={styles.boxInfo}>
                     <AntDesign name="info" size={16} color={colors.wh0} />
                  </View>

                  <Text style={styles.info}>
                     {"Você pode editar o nome da nota e a descrição, tocando e segurando sobre o nome da nota ou sobre a descrição."}
                  </Text>
               </View>

               {/* Todos os componentes dentro do ViewShot serão capturados, gerando uma imagem *png para compartilhamento */}
               <ViewShot ref={viewShotRef} style={styles.viewShotComponent}>
                  <View style={{ ...styles.userBox, marginTop: 35 }}>
                     <TouchableOpacity
                        onLongPress={() => setIsNoteNameEditable(true)}
                        style={{ width: "100%", display: "flex", flexDirection: "row" }}
                     >
                        {/* Input onde o novo nome da nota será inserido e exibido para o usuário*/}
                        <TextInput
                           editable={isNoteNameEditable}
                           onChangeText={(text) => {
                              setNoteName(text);
                              saveChangesToAsyncStorage();
                           }}
                           style={{ ...styles.title, backgroundColor: isNoteNameEditable ? colors.wh0 : colors.wh1 }}
                        >
                           {noteName}
                        </TextInput>

                        {isNoteNameEditable ?
                           <View style={styles.characterCounterFloatBox}>
                              {/* Contador de caracteres do nome da nota */}
                              <Text style={{ ...styles.characterCounter, width: 38 }}>{`${noteTitleCount}/25`}</Text>

                              {/* Botão de confirmação de alteração do nome da nota */}
                              <TouchableOpacity onPress={() => setIsNoteNameEditable(false)} style={styles.checkButton}>
                                 <AntDesign name="check" size={10} color={colors.wh0} />
                              </TouchableOpacity>
                           </View>
                           : null
                        }
                     </TouchableOpacity>

                     <TouchableOpacity
                        onLongPress={() => setIsDescriptionNameEditable(true)}
                        style={{ width: "100%" }}
                     >
                        <TextInput
                           editable={isDescriptionNameEditable}
                           multiline={true}
                           numberOfLines={4}
                           onChangeText={(text) => {
                              setDescriptionName(text);
                              saveChangesToAsyncStorage();
                           }}
                           style={{ ...styles.text, backgroundColor: isDescriptionNameEditable ? colors.wh0 : colors.wh1 }}
                        >
                           {descriptionName}
                        </TextInput>

                        {isDescriptionNameEditable ?
                           <View style={styles.characterCounterFloatBox}>
                              {/* Contador de caracteres da descrição */}
                              <Text style={{ ...styles.characterCounter, width: 52 }}>{`${noteTextCount}/135`}</Text>

                              {/* Botão de confirmação de alteração da descrição da nota */}
                              <TouchableOpacity onPress={() => setIsDescriptionNameEditable(false)} style={styles.checkButton}>
                                 <AntDesign name="check" size={10} color={colors.wh0} />
                              </TouchableOpacity>
                           </View>
                           : null
                        }
                     </TouchableOpacity>

                     <TextInput
                        value={"ID: " + recoveredId}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.id = text : null }}
                        style={{ ...styles.input, marginTop: 25 }}
                     />

                     <TextInput
                        value={"Nome: " + recoveredData.name}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.name = text : null }}
                        style={styles.input}
                     />

                     <TextInput
                        value={"Data de Nascimento: " + recoveredData.born}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.born = text : null }}
                        style={styles.input}
                     />

                     <TextInput
                        value={"Sexo: " + recoveredData.gender}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.gender = text : null }}
                        style={styles.input}
                     />

                     <TextInput
                        value={"Documento: " + recoveredData.document}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.document = text : null }}
                        style={styles.input}
                     />

                     <TextInput
                        value={"Endereço: " + recoveredData.adress}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.adress = text : null }}
                        style={styles.input}
                     />

                     <TextInput
                        value={"Cidade e Estado: " + recoveredData.city}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.city = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={"Telefone: " + recoveredData.phone}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.phone = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={"Email: " + recoveredData.email}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.email = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={"Modelo do aparelho: " + recoveredData.model}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.model = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={"Número de Série: " + recoveredData.serialNumber}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.serialNumber = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={"Data de Entrada: " + recoveredData.dateIn}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.dateIn = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={"Data de Saída: " + recoveredData.dateOut}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.dateOut = text : text }}
                        style={styles.input}
                     />

                     <View
                        style={{
                           marginTop: 15,
                           marginLeft: 35,
                           display: "flex",
                           flexDirection: "row",
                        }}
                     >
                        <View>
                           {/* Verifica se a URI para a imagem capturada existe e exibe o QR para a URI */}
                           {generatedImageURI.length > 0 ? (<QRCode value={generatedImageURI} size={115} />) : null}
                        </View>

                        <View style={{ width: 180 }}>
                           <Text style={{ ...styles.text, paddingLeft: 0, color: colors.bk0 }}>
                              {"Este é o seu código QR para o documento, escaneie com  um aplicativo QR"}
                           </Text>
                        </View>
                     </View>
                  </View>
               </ViewShot>

               <TouchableOpacity
                  disabled={false}
                  onPress={() => shareImage()}
                  style={{ ...styles.buttonBox, marginTop: 8, backgroundColor: colors.wh1 }}
               >
                  <AntDesign name="export" size={24} color={colors.bk0} />
                  <Text style={{ color: colors.bk0 }}> Compartilhar e Salvar</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  disabled={true}
                  onPress={() => setisEditable(true)} // Torna os inputs todos editáveis
                  style={{ ...styles.buttonBox, marginTop: 8, backgroundColor: colors.wh1 }}
               >
                  <AntDesign name="edit" size={24} color={colors.bk0} />
                  <Text style={{ color: colors.bk0 }}> Editar usuário</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  disabled={true}
                  onPress={() => {
                     setIsRegister(true);
                     setTimeout(() => { editUserSelected(updatedUserData) }, 1000);
                  }}
                  style={{ ...styles.buttonBox, marginTop: 10, backgroundColor: colors.bl0 }}
               >
                  <AntDesign name="save" size={24} color={colors.wh0} />
                  <Text style={{ color: colors.wh0 }}> Salvar as alterações</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => { removeUserById() }}
                  style={{ ...styles.buttonBox, marginTop: 8, backgroundColor: colors.rd0 }}
               >
                  <AntDesign name="deleteuser" size={24} color={colors.wh0} />
                  <Text style={{ color: colors.wh0 }}> Remover usuário</Text>
               </TouchableOpacity>
            </View>
         </ScrollView >
      </SafeAreaView >
   );
};
