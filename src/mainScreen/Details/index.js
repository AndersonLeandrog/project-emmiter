import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Share, TextInput } from 'react-native';

// import { arquivos do firebase/firestore e AsyncStorage }
import firestore from '../../config/firebase';
import { collection, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { arquivos de estilo }
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from "../../config/colors";
import styles from "./style";

export default function Details({ navigation }) {
   const [recoveredData, setRecoveredData] = useState('');
   const [recoveredId, setRecoveredId] = useState('');
   const [isEditable, setisEditable] = useState(false);
   const [isRegister, setIsRegister] = useState(false);

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

   return (
      <SafeAreaView>
         <ScrollView>
            <View style={styles.container}>
               <TouchableOpacity
                  onPress={() => {/*detalhes sobre o usuário*/ }}
                  style={{ ...styles.userBox, marginTop: 50 }}
               >

                  <TextInput
                     value={'ID: ' + recoveredId}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.id = text : null }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.name}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.name = text : null }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.born}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.born = text : null }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.gender}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.gender = text : null }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.document}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.document = text : null }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.adress}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.adress = text : null }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.city}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.city = text : text }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.phone}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.phone = text : text }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.email}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.email = text : text }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.model}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.model = text : text }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.serialNumber}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.serialNumber = text : text }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.dateIn}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.dateIn = text : text }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />

                  <TextInput
                     value={recoveredData.dateOut}
                     editable={isEditable}
                     onChangeText={(text) => { isRegister ? updatedUserData.dateOut = text : text }}
                     style={{ ...styles.input, fontStyle: 'italic', color: colors.black, paddingLeft: 10 }}
                  />
               </TouchableOpacity>

               <TouchableOpacity
                  disabled={true}
                  onPress={() => {/*detalhes sobre o usuário*/ }}
                  style={{ ...styles.buttonBox, marginTop: 25, backgroundColor: colors.whiteSmoke }}
               >
                  <AntDesign name='export' size={24} color={colors.black} />
                  <Text style={{ color: colors.black }}> Compartilhar (em breve)</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  disabled={true}
                  onPress={() => {/*detalhes sobre o usuário*/ }}
                  style={{ ...styles.buttonBox, marginTop: 8, backgroundColor: colors.whiteSmoke }}
               >
                  <AntDesign name='qrcode' size={24} color={colors.black} />
                  <Text style={{ color: colors.black }}> Ler código QR (em breve)</Text>
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
                  style={{ ...styles.buttonBox, marginTop: 10, backgroundColor: colors.green }}
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
      </SafeAreaView>
   );
};
