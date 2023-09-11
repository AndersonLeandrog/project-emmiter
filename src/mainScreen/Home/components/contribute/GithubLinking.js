import React, { useContext } from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';
import app from '../../../../../context';

import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../config/colors';

export default function Github() {
   const context = useContext(app);
   const { appSocialInfo } = context;

   return (
      <TouchableOpacity
         onPress={() => Linking.openURL('https://github.com/AndersonLeandrog/project-emmiter')}
         style={{ marginTop: 15 }}
      >
         <Text
            style={{
               fontSize: 20,
               padding: 10,
               color: colors.black,
               backgroundColor: colors.whiteSmoke,
            }}>
            <AntDesign name='github' size={24} color={colors.black} />
            {appSocialInfo.githubProject}
         </Text>
      </TouchableOpacity>
   );
};