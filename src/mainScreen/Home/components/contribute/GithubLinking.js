import React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';

// Imports { arquivos de estilo }
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../config/colors';

export default function Github() {
   return (
      <TouchableOpacity 
         onPress={() => Linking.openURL('https://github.com/AndersonLeandrog/project-emmiter')} 
         style={{
            marginTop: 15
         }}
      >
         <Text 
            style={{
               fontSize: 20,
               padding: 10, 
               color: colors.black,
               backgroundColor: colors.whiteSmoke,
            }}>
            <AntDesign name='github' size={24} color={colors.black} />
            {' @github/project-emmiter'}
         </Text>
      </TouchableOpacity>
   );
};