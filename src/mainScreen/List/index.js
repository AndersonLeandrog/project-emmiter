import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';

import firestore from '../../config/firebase';
import { collection, getDocs, getDoc, deleteDoc } from "firebase/firestore";

// Arquivos de estilização do app
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
         // navigation.getParam('Emmiter', {totalUsers: totalUsersNumber});
         
         // Verifica o número de usuários masculinos e femininos que já foram cadastrados
         // armazena o número de usuários masculinos e femininos que já foram cadastrados no AsyncStorage
         usersData.forEach(async (number, index) => {
            const userBySex = usersData[index].gender;
            if(userBySex === 'masculino' || userBySex === 'Masculino') {
               await AsyncStorage.setItem('totalMasculineUsersNumber', String(index));
            } else if(userBySex === 'feminino' || userBySex === 'Feminino') {
               await AsyncStorage.setItem('totalFeminineUsersNumber', String(index));
            }
         });
      };
      recoveryData('user');
   }, []);

   // Envia o id do usuário selecionado para a tela de "Detalhes",
   // na tela de "Detalhes" esse id é procurado no firestorage e é exibido
   // a informação completa do usuário que foi selecionado passando o id

   // O id é definido no AsyncStorage e fica disponível globalmente para toda
   // a aplicação através do método getItem() do AsyncStorage
   async function sendDataToDetails(id) { 
      try {
         await AsyncStorage.setItem('id', id);
         navigation.navigate('Details');
      } catch (error) {
         console.log('Erro ao definir o id no AsyncStorage: ', error);
      }
   };

   const loadList = () => {
      return (
         <FlatList
         data={recoveredData}
         keyExtractor={item => item.id}
         renderItem={({ item }) => (
            <TouchableOpacity
               onPress={() => {
                  sendDataToDetails(item.id);
               }}
               style={{
                  width: 320,
                  marginTop: 15,
                  borderRadius: 10,
                  backgroundColor: colors.whiteSmoke,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
               }}
            >
               <View>
                  <Text 
                  style={{
                     color: colors.green,
                     paddingTop: 10,
                     paddingLeft: 10
                  }}>{'ID: ' + item.id}</Text>
                  <Text style={{ paddingLeft: 10, paddingBottom: 10, color: colors.black}}>{'Nome: ' + item.name}</Text>
               </View>
            </TouchableOpacity>
         )}/>
      )
   };

   const loadListError = () => {
      return (
         <View style={{display: 'flex', flexDirection: 'colunm', justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
            <AntDesign name='meh' size={64} color='#000' />
            <Text style={{fontStyle: 'italic', color: '#000', paddingTop: 25, textAlign: 'center'}}>
               {
                  'Não há nada aqui!\n' +
                  'Para adicionar um usuário,\n' +
                  'volte até a tela inicial e em (Atalhos)\n' +
                  'toque em (Adicionar usuário)\n'
               }
            </Text>
         </View>
      )
   };

   return (
      <SafeAreaView>
         <ScrollView>
            <View style={styles.container}>{ recoveredData.length > 0 ? loadList() : loadListError() }</View>
         </ScrollView>
      </SafeAreaView>
   );
};
