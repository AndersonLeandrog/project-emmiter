import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { arquivos de estilo }
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../config/colors';
import style from './style';

export default function Welcome({ navigation }) {
   const sendData = async (screen, load) => {
      await AsyncStorage.setItem('screen', screen);
      await AsyncStorage.setItem('load', load)
      navigation.navigate('Home');
   };

   return (
      <View style={style.container}>
         <View style={{position: 'absolute', top: 100}}>
            <Text style={{fontSize: 28, color: colors.black}}>
               {'Precisa se autenticar?'}
            </Text>

            <Text style={{...style.description}}>
               {'Anote a sua chave!\n\nAbaixo disponibilizamos uma chave padrão de autenticação, como este projeto ainda está em fase de desenvolvimento ainda estamos resolvendo algumas coisas...\n'}
            </Text>

            <Text style={{...style.description}}>
               {'Esse será o seu login e senha, se preferir anote para que não tenha problemas no futuro, essa chave vai garantir que só você possa ter acesso direto ao painel de gerenciamento de cliente do aplicativo.'}
            </Text>
         </View>

         <View style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginTop: 300,
            marginBottom: 50
         }}>
            <AntDesign name='key' size={62} color={colors.black} />
         </View>

         <View style={{width: '80%', marginTop: 15}}>
            <Text style={{...style.description}}>
               {'{\n    usuário: admin@provedor.com\n    senha: @admin\n}'}
            </Text>
         </View>  

         <TouchableOpacity 
            onPress={() => sendData('false', 'true')}
            style={style.button}
         >
            <AntDesign name='check' size={24} color='#fff' />
            <Text style={{color: '#fff'}}>  ir para o painel</Text>
         </TouchableOpacity>

      </View>
   );
};