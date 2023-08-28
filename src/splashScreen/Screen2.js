import React from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { arquivos de estilo }
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../config/colors';
import style from './style';

export default function ScreenB({ navigation }) {
   const sendData = async (screen, load) => {
      await AsyncStorage.setItem('screen', screen);
      await AsyncStorage.setItem('load', load)
      navigation.navigate('Home');
   };

   return (
      <>
         <StatusBar 
            backgroundColor={colors.white}
            barStyle={'dark-content'}
         />

         <View style={style.container}>
            <View style={{width: '100%', backgroundColor: colors.white, flex: 1}}>
               <Text style={{fontSize: 23, color: colors.black, paddingLeft: 20, paddingTop: 50}}>
                  {'Essa é a sua chave,\nanote a sua chave de login!'}
               </Text>

               <Text style={{fontSize: 16, color: colors.black, paddingLeft: 20, paddingRight: 20, paddingTop: 15}}>
               {
                  'Anote a sua chave!\n\n' +
                  'Abaixo disponibilizamos uma chave padrão de autenticação, como este projeto ainda está em fase de desenvolvimento ainda estamos resolvendo algumas coisas...\n\n' +
                  'Esse será o seu login e senha, se preferir anote para que não tenha problemas no futuro, essa chave vai garantir que só você possa ter acesso direto ao painel de gerenciamento de cliente do aplicativo.'
               }
               </Text>

               <View style={{width: '100%', height: 250, marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <AntDesign name='key' size={64} color={colors.black} />
                  <Text style={{fontSize: 16, color: colors.black, paddingLeft: 20, paddingTop: 15}}>{'email: admin@admin.com\nsenha: admin'}</Text>
               </View>
            </View>

            <TouchableOpacity 
               onPress={() => sendData('false', 'true')}
               style={{...style.button, width: 120, borderWidth: 1, borderColor: colors.black}}
            >
               <AntDesign name='check' size={24} color={colors.black} />
               <Text style={{color: colors.black}}>  Finalizar</Text>
            </TouchableOpacity>
         </View>
      </>
   );
};
