import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

// import { arquivos de estilo }
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../config/colors';
import style from '../../style';

export default function Logo() {
   return (
      <View style={{...style.LogoBox}}>
         <Text style={{fontSize: 26, fontStyle: 'italic', color: colors.black, paddingLeft: 15}}>
            <TouchableOpacity style={{
               width: 24,
               height: 24,
               borderRadius: 50,
               backgroundColor: colors.black,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}>
               <AntDesign name='sync' size={16} color={colors.white}/>
            </TouchableOpacity>
            {' Emmiter'}
         </Text>

         <Text style={{fontSize: 16, fontStyle: 'italic', color: colors.black, paddingLeft: 15, paddingBottom: 20}}>
            {'Seu app de cadastro de clientes,\nAdicione, Gerencie, Edite e Remova a qualquer momento.'}
         </Text>
      </View>
   );
};