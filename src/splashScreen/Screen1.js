import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

// import { arquivos de estilo }
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../config/colors';
import style from './style';

export default function Welcome({ navigation }) {
   return (
      <View style={style.container}>
         <View style={{position: 'absolute', top: 100}}>
            <Text style={{fontSize: 28, color: colors.black, paddingBottom: 15}}>
               {'Seja bem vindo\nesse é o Emmiter.'}
            </Text>

            <Text style={{...style.description}}>
               {'Emmiter é um aplicativo de gerenciamento de clientes desenvolvido com react-native, é um aplicativo minimalista com interface amigável e simples de se entender.\n'}
            </Text>

            <Text style={{...style.description}}>
               {'Atualmente o aplicativo está em beta e disponível apenas no github, você pode acessar a nossa página em <github.com/project-emmiter>.\n'}
            </Text>

            <Text style={{...style.description}}>
               {'Este projeto utiliza como base o google firebase, e não armazena portanto dados sensíveis ao usuário, se tiver maiores dúvidas acesse o site oficial do projeto e tenha acesso ao termo de uso.\n'}
            </Text>

            <View style={{
               display: 'flex', 
               justifyContent: 'center', 
               alignItems: 'center',
               marginTop: 50,
               marginBottom: 50
            }}>
               <AntDesign name='form' size={62} color={colors.black} />
            </View>

            <Text style={{...style.description}}>
               {'<http://github.com/project-emmiter-site>'}
            </Text>
         </View>  

         <TouchableOpacity 
            onPress={() => navigation.navigate('Tutorial')}
            style={style.button}
         >
            <AntDesign name='check' size={24} color={colors.white} />
            <Text style={{color: colors.white}}>  Compreendo, continuar...</Text>
         </TouchableOpacity>
      </View>
   );
};