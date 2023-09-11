import React, { useEffect, useContext, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, Modal } from 'react-native';

import app from '../../../../../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../../config/colors';
import style from './style';

export default function Logo() {
   const context = useContext(app);
   const { appInfo } = context;

   const [textModal, setTextModal] = useState(false);
   const [userName, setUserName] = useState('Visitante'); // Recebe um nome genérico padrão
   const [description, setDescription] = useState('Olá, seja bem vindo!'); // Recebe uma descrição genérica padrão

   const [newName, setNewName] = useState('Jhon Doe'); // Recebe o novo nome definido pelo usuário
   const [newDescription, setNewDescription] = useState('Olá, eu sou Jhon Doe!'); // Recebe uma nova descrição definida pelo usuário

   useEffect(() => {
      /// Função assíncrona para recuperar os valores do AsyncStorage
      async function fetchDataFromAsyncStorage() {
         try {
            // Recupera os valores do AsyncStorage
            const NAME = await AsyncStorage.getItem('username');
            const DESCRIPTION = await AsyncStorage.getItem('userdescription');

            // Verifica se os valores são válidos (não nulos)
            if (NAME !== null && DESCRIPTION !== null) {
               setUserName(NAME);
               setDescription(DESCRIPTION);
            }
         } catch (error) {
            console.log('Erro ao recuperar dados do AsyncStorage: ', error);
         }
      }

      // Chama a função para recuperar os dados quando o componente é montado
      fetchDataFromAsyncStorage();
   }, []);

   const handleSaveChanges = async () => {
      try {
         // Atualiza o estado com os novos valores
         setUserName(newName);
         setDescription(newDescription);

         // Atualiza o AsyncStorage com os novos valores
         await AsyncStorage.setItem('username', newName);
         await AsyncStorage.setItem('userdescription', newDescription);

         // Fecha o modal
         setTextModal(false);
      } catch (error) {
         console.log('Erro ao armazenar os novos dados do usuário: ', error);
      }
   };

   return (
      <>
         <View style={style.LogoBox}>
            {/* Foto do usuário */}
            <TouchableOpacity style={style.imageButton}>
               <Image
                  source={require('../../../../../../img/bird.jpg')}
                  style={{ width: 80, height: 80, borderRadius: 50 }}
               />
            </TouchableOpacity>

            {/* Nome e descrição do usuário */}
            <TouchableOpacity onLongPress={() => setTextModal(true)} style={style.infoBox}>
               <Text style={style.nameText}>{userName}</Text>
               <Text style={style.descriptionText}>{description}</Text>
            </TouchableOpacity>

            {/* Badge: nome do aplicativo */}
            <View style={{ ...style.appBadge, width: 85, top: 5, right: 5 }}>
               <AntDesign name='info' size={14} color={colors.white} />
               <Text style={{ color: colors.white }}>{appInfo.name}</Text>
            </View>

            {/* Badge: versão do aplicativo */}
            <View style={{ ...style.appBadge, width: 75, top: 32, right: 5 }}>
               <AntDesign name='tago' size={14} color={colors.white} />
               <Text style={{ color: colors.white }}>{appInfo.version}</Text>
            </View>

            {/* Botão: Logout */}
            <TouchableOpacity style={{ ...style.appBadge, width: 35, height: 35, borderRadius: 50, top: 10, left: 10 }}>
               <AntDesign name='logout' size={14} color={colors.white} />
            </TouchableOpacity>
         </View>

         {/* Modal de alteração de nome e descrição */}
         <Modal animationType='fade' transparent={true} visible={textModal}>
            {/* Input: Nome */}
            <View style={style.boxModal}>
               <TextInput
                  placeholder='Novo nome de usuário (de 4 a 15 caracteres máx.)'
                  placeholderTextColor={colors.lightBlack}
                  onChangeText={(text) => {
                     // Suporta o min. de 4 caracteres e o máx. de 15 caracteres
                     text.length >= 4 && text.length <= 15 ? setNewName(text) : null
                  }}
                  style={style.input}
               />

               {/* Input: Descrição */}
               <TextInput
                  placeholder='Descrição (de 15 a 40 caracteres máx.)'
                  placeholderTextColor={colors.lightBlack}
                  onChangeText={(text) => {
                     // Suporta o min. de 15 caracteres e o máx. de 40 caracteres
                     text.length >= 15 && text.length <= 40 ? setNewDescription(text) : null
                  }}
                  style={style.input}
               />

               <View style={style.buttonBox}>
                  {/* Botão de voltar do modal */}
                  <TouchableOpacity onPress={() => setTextModal(false)} style={style.backButton}>
                     <AntDesign name='back' size={14} color={colors.lightBlack} />
                     <Text style={{ paddingLeft: 5, color: colors.lightBlack }}>Voltar</Text>
                  </TouchableOpacity>

                  {/* Botão de alterar do modal */}
                  <TouchableOpacity onPress={() => handleSaveChanges()} style={style.changeButton}>
                     <AntDesign name='save' size={14} color={colors.white} />
                     <Text style={{ paddingLeft: 5, color: colors.white }}>Alterar</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Modal>
      </>
   );
};