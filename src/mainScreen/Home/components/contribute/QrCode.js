import React from 'react';
import { View, Image } from 'react-native';

export default function Qr() {
   return (
      <View 
         style={{
            width: 160, 
            height: 160,  
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
         }}
      >
         <Image source={require('../../../../../img/qrcode.png')} style={{width: 150, height: 150, padding: 10}}/>
      </View>
   );
};