import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import moment from "moment/moment";
import localization from 'moment/locale/pt';
moment.updateLocale('pt', localization);
import styles from '../../style';

export default function Clock() {
   const [actualHour, setActualHour] = useState('');
   useEffect(() => {
      setInterval(() => {
         if(moment().format('HH') > 12 && moment().format('HH') <= 23) {
           setActualHour(moment().format('HH:mm'));
         } else {
           setActualHour(moment().format('HH:mm'));
         }
      }, 1000);
   }, []);

   const color = {
      item: '#000'
   };

   return (
      <View style={{...styles.clockBox}}>
         <Text style={{fontSize: 23, color: color.item, paddingLeft: 15, paddingTop: 30}}>{actualHour}</Text>
         <Text style={{fontSize: 16, fontStyle: 'italic', color: color.item, paddingLeft: 15}}>
            {
            moment().format('dddd') + ',\n' +
            moment().format('DD') + ' de ' + moment().format('MMMM') + ' de ' +
            moment().format('YYYY')
            }
         </Text>
      </View>
   );
};