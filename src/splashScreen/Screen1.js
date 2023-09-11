import React from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../config/colors';
import style from './style';

export default function ScreenA({ navigation }) {
   return (
      <>
         <StatusBar
            backgroundColor={colors.white}
            barStyle={'dark-content'}
         />

         <View style={style.container}>
            <View style={{ width: '100%', backgroundColor: colors.white, flex: 1 }}>
               <Text style={{ fontSize: 23, color: colors.black, paddingLeft: 20, paddingTop: 50 }}>
                  {'Seja bem vindo\nesse é o Emmiter.'}
               </Text>

               <Text style={{ fontSize: 16, color: colors.black, paddingLeft: 20, paddingRight: 20, paddingTop: 15 }}>
                  {
                     'Emmiter é um aplicativo de gerenciamento de clientes desenvolvido com react-native,' +
                     'é um aplicativo minimalista com interface amigável e simples de se entender.\n\n' +

                     'Atualmente o aplicativo está em beta e disponível apenas no github, você pode' +
                     'acessar a nossa página em <github.com/project-emmiter>\n\n' +

                     'Esse projeto utiliza como base o google firebase e não armazena, portanto, ' +
                     'dados sensíveis ao usuário, se tiver maiores dúvidas acesse o site oficial do projeto e tenha acesso ao termo de uso.'
                  }
               </Text>

               <View style={{ width: '100%', height: 250, marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <AntDesign name='disconnect' size={64} color={colors.black} />
                  <Text style={{ fontSize: 16, color: colors.black, paddingLeft: 20, paddingTop: 15 }}>{'github.com/project-emmiter-site'}</Text>
               </View>
            </View>

            <TouchableOpacity
               onPress={() => navigation.navigate('ScreenB')}
               style={style.button}
            >
               <AntDesign name='check' size={24} color={colors.white} />
               <Text style={{ color: colors.white }}>  Entendo, continuar...</Text>
            </TouchableOpacity>
         </View>
      </>
   );
};