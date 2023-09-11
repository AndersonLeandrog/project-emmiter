import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import app from '../../../../../context';

import Clipboard from '@react-native-clipboard/clipboard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../config/colors';

export default function Pix() {
   // Obtém os dados do contexto
   const context = useContext(app);
   const { appSocialInfo } = context;

   // Copia o conteúdo para a área de transferência
   function ClipboardKey() {
      Clipboard.setString(appSocialInfo.pixKey)
   };

   return (
      <TouchableOpacity onPress={() => ClipboardKey()}>
         <Text
            style={{
               fontSize: 14,
               padding: 10,
               color: colors.black,
               marginTop: 5,
               backgroundColor: colors.whiteSmoke,
            }}>
            <AntDesign name='copy1' size={24} color={colors.black} />
            {appSocialInfo.pixKey}
         </Text>
      </TouchableOpacity>
   );
};