import React from 'react';
import { Text, View } from 'react-native';

// Imports { arquivos de estilo }
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../config/colors';
import styles from '../../style';

export default function Social() {
   return (
      <View style={{ ...styles.socialContainer }}>
         <View style={{ ...styles.socialBox }}>
            <Text style={{ fontSize: 14, color: colors.black }}>
               <AntDesign name='github' size={24} color={colors.black} />
               {'  andersonleandrog  '}
            </Text>

            <Text style={{ fontSize: 14, color: colors.black, paddingRight: 15 }}>
               <AntDesign name='facebook-square' size={24} color={colors.black} />
               {'  andersonlfb  '}
            </Text>
         </View>

         <View style={{ ...styles.socialBox, marginTop: 5 }}>
            <Text style={{ fontSize: 14, color: colors.black }}>
               <AntDesign name='twitter' size={24} color={colors.black} />
               {'  twitter.com/andersonldev1'}
            </Text>
         </View>

         <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25
         }}>
            <AntDesign name='tago' size={16} color={colors.black} />
            <Text style={{ fontSize: 14, color: colors.black }}>1.2.15-0</Text>
         </View>
      </View>
   );
};