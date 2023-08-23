import React from 'react';
import { Text, View } from 'react-native';

import GithubLink from './GithubLinking';
import PixLink from './PixLinking';
import Qr from './QrCode';
import styles from '../../style';

export default function Banner() {
   return (
      <View style={styles.banner}>
         <View style={styles.bannerContainer}>
            <Text 
               style={{
               textAlign: 'left', 
               fontSize: 18,
               paddingBottom: 5, 
               color: '#000'
               }}
            >{'Contribua para o\nprojeto!'}
            </Text>
            <GithubLink />
            <PixLink />
         </View>

         <View style={styles.bannerQrContainer}>
            <Qr />
         </View>
      </View>
   );
};