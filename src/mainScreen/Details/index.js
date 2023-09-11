import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';

// import { arquivos do firebase/firestore e AsyncStorage }
import firestore from '../../config/firebase';
import { collection, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

import RNFS from 'react-native-fs';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import QRCode from "react-native-qrcode-svg";


// import { arquivos de estilo }
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from "../../config/colors";
import styles from "./style";

export default function Details({ navigation }) {
   const [recoveredData, setRecoveredData] = useState('');
   const [recoveredId, setRecoveredId] = useState('');
   const [isEditable, setisEditable] = useState(false);
   const [isRegister, setIsRegister] = useState(false);
   const [generatedImageURI, setGeneratedImageURI] = useState('');

   const clientRef = collection(firestore, 'user');

   useEffect(() => {
      // Obtém o id passado através do AsyncStorage para realizar a solicitação dos detalhes
      // do usuário que foi selecionado pelo id, chama a função recoveryData() passando o id como parâmetro
      // recoveryData irá fazer uma consulta no fireStorage do Firebase e retornará os dados completos do usuário selecionado.
      const asyncStorageRecoveryData = async () => {
         try {
            const data = await AsyncStorage.getItem('id');
            recoveryData(data);
         } catch (error) {
            console.log('Erro ao obter o id do usuário selecionado: ', error);
         }
      };

      asyncStorageRecoveryData();

      const recoveryData = async (users) => {
         console.log(users)
         try {
            const userDocRef = doc(clientRef, users);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
               const userData = userDocSnapshot.data();
               setRecoveredData(userData);
               setRecoveredId(users);
            } else {
               console.log('Documento não foi encontrado');
            }
         } catch (error) {
            console.log('Erro ao recuperar os dados: ', error);
         }
      };
   }, []);

   // Editar o usuário...
   const updatedUserData = {};

   const editUserSelected = async (updatedUserData) => {
      try {
         const userId = await AsyncStorage.getItem('id'); // Obtém o id do usuário selecionado
         const userDocRef = doc(clientRef, userId); // Verifica o id no firebase
         const userDocSnapshot = await getDoc(userDocRef); // Obtém os dados do id do usuário selecionado

         // Se os dados existirem os dados atuais serão substituídos pelos novos dados
         if (userDocSnapshot.exists()) {
            const existingUserData = userDocSnapshot.data();
            const updatedData = { ...existingUserData, ...updatedUserData };
            await setDoc(userDocRef, updatedData);
            console.log('Usuário foi editado com sucesso!');
         } else {
            console.log('O Documento não foi encontrado.');
         }
      } catch (error) {
         console.log('Erro ao editar o usuário: ', error);
      }
      setisEditable(false);
   };

   // Remover o usuário...
   async function removeUserById() {
      try {
         const userId = await AsyncStorage.getItem('id');
         const userDocRef = doc(clientRef, userId);
         const userDocSnapshot = await getDoc(userDocRef);
         if (userDocSnapshot.exists()) {
            await deleteDoc(userDocRef);
            await AsyncStorage.setItem('removedId', userId);
            navigation.navigate('List');
            console.log('Usuário removido com sucesso');
         } else {
            console.log('Documento não foi encontrado');
         }
      } catch (error) {
         console.log('Erro ao remover o usuário: ', error);
      }
   };

   const viewShotRef = useRef();

   async function screenShotCapture() {
      try {
         const uri = await viewShotRef.current.capture(); // Captura o componente dentro da ViewShot usando react-native-view-shot
         setGeneratedImageURI(uri); // Atribui a imagem capturada do componente ao componente de Imagem <Image/>
      } catch (error) {
         console.log('Houve um erro ao capturar a imagem: ', error);
      }
   };

   // Função para compartilhar a imagem da nota capturada.
   // ao tocar em compartilhar e salvar  no armazenamento do aplicativo em: 0/android/data/com.emmiter/files/*imagem.png*
   async function shareImage() {

      // Compartilha a Imagem
      try {
         // Abre a opção de compartilhar passando as propriedades do Objeto 
         await Share.open({
            title: 'Arquivo de nota do Emmiter',
            url: generatedImageURI,
            type: 'image/png',
         });
      } catch (error) {
         console.log('Houve um erro ao compartilhar a imagem: ', error);
      }

      // Salva a imagem no armazenamento do aparelho
      try {
         // Gera um nome aleatório para a imagem
         const randomNumber = Math.floor(Math.random() * 10000) + 1;

         // Especifica a pasta para o local em que a imagem será salva.
         const filePath = RNFS.ExternalDirectoryPath + '/SCREENSHOT_EMMITER_' + randomNumber + '.png';

         // Move a imagem capturada para o caminho do arquivo especificada.
         RNFS.moveFile(generatedImageURI, filePath);
      } catch (error) {
         console.log('Houve um erro ao salvar a imagem: ', error);
      }
   };

   return (
      <SafeAreaView>
         <ScrollView>
            <View style={styles.container}>
               <ViewShot
                  ref={viewShotRef}
                  style={{
                     width: '95%',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <TouchableOpacity
                     onPress={() => {/*detalhes sobre o usuário*/ }}
                     style={{ ...styles.userBox, marginTop: 50 }}
                  >
                     <View style={{ width: '100%' }}>
                        <Text style={styles.title}>{'Emmiter'}</Text>
                     </View>

                     <View style={{ width: '100%' }} >
                        <Text style={styles.text}>
                           {'Abaixo estão todos os dados do usuário, edite a nota tocando no botão de editar e em seguida toque na propriedade que deseja editar.'}
                        </Text>
                     </View>

                     <TextInput
                        value={'ID: ' + recoveredId}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.id = text : null }}
                        style={{ ...styles.input, marginTop: 25 }}
                     />

                     <TextInput
                        value={'Nome: ' + recoveredData.name}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.name = text : null }}
                        style={styles.input}
                     />

                     <TextInput
                        value={'Data de Nascimento: ' + recoveredData.born}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.born = text : null }}
                        style={styles.input}
                     />

                     <TextInput
                        value={'Sexo: ' + recoveredData.gender}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.gender = text : null }}
                        style={styles.input}
                     />

                     <TextInput
                        value={'Documento: ' + recoveredData.document}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.document = text : null }}
                        style={styles.input}
                     />

                     <TextInput
                        value={'Endereço: ' + recoveredData.adress}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.adress = text : null }}
                        style={styles.input}
                     />

                     <TextInput
                        value={'Cidade e Estado: ' + recoveredData.city}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.city = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={'Telefone: ' + recoveredData.phone}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.phone = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={'Email: ' + recoveredData.email}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.email = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={'Modelo do aparelho: ' + recoveredData.model}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.model = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={'Número de Série: ' + recoveredData.serialNumber}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.serialNumber = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={'Data de Entrada: ' + recoveredData.dateIn}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.dateIn = text : text }}
                        style={styles.input}
                     />

                     <TextInput
                        value={'Data de Saída: ' + recoveredData.dateOut}
                        editable={isEditable}
                        onChangeText={(text) => { isRegister ? updatedUserData.dateOut = text : text }}
                        style={styles.input}
                     />

                     <View
                        style={{
                           width: '100%',
                           marginTop: 20,
                           display: 'flex',
                           flexDirection: 'row',
                           justifyContent: 'space-evenly',
                        }}
                     >
                        <View
                           style={{
                              width: 120,
                              height: 140,
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                           }}
                        >
                           {generatedImageURI.length > 0 ? (
                              <QRCode
                                 value={generatedImageURI}
                                 size={115}
                              />
                           ) : null}
                        </View>

                        <View style={{ width: 200 }}>
                           <Text style={{ ...styles.text, paddingLeft: 0 }}>
                              {'Este é o QR para o documento, escaneie com  um aplicativo para QRCode.'}
                           </Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </ViewShot>

               <TouchableOpacity
                  disabled={false}
                  onPress={() => {
                     screenShotCapture();
                     shareImage();
                  }}
                  style={{ ...styles.buttonBox, marginTop: 8, backgroundColor: colors.whiteSmoke }}
               >
                  <AntDesign name='export' size={24} color={colors.black} />
                  <Text style={{ color: colors.black }}> Compartilhar & Salvar</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  disabled={true}
                  onPress={() => setisEditable(true)} // Torna os inputs todos editáveis
                  style={{ ...styles.buttonBox, marginTop: 8, backgroundColor: colors.whiteSmoke }}
               >
                  <AntDesign name='edit' size={24} color={colors.black} />
                  <Text style={{ color: colors.black }}> Editar (em breve)</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  disabled={true}
                  onPress={() => {
                     setIsRegister(true);
                     setTimeout(() => { editUserSelected(updatedUserData) }, 1000);
                  }}
                  style={{ ...styles.buttonBox, marginTop: 10, backgroundColor: colors.blue }}
               >
                  <AntDesign name='save' size={24} color={colors.white} />
                  <Text style={{ color: colors.white }}> Salvar alterações (em breve)</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => { removeUserById() }}
                  style={{ ...styles.buttonBox, marginTop: 8, backgroundColor: colors.red }}
               >
                  <AntDesign name='deleteuser' size={24} color={colors.white} />
                  <Text style={{ color: colors.white }}> Remover</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </SafeAreaView >
   );
};
