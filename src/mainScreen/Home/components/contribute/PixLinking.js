import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Pix() {

   function ClipboardKey() { 
      // Copia o conteúdo para a área de transferência
      Clipboard.setString('3cdd66ab-6aa8-4761-bb98-4a48f94ea8aa')
   };

   const color = {
      textColor: '#000',
      buttonBackground: '#ebebeb'
   };

   return (
      <TouchableOpacity onPress={() => ClipboardKey()}>
         <Text 
            style={{
               fontSize: 14,
               padding: 10, 
               color: color.textColor,
               marginTop: 5,
               backgroundColor: color.buttonBackground,
            }}>
            <AntDesign name='copy1' size={24} color={color.textColor} />
            {'  3cdd66ab-6aa8-4761-bb98-4a48f94ea8aa'}
         </Text>
      </TouchableOpacity>
   );
};