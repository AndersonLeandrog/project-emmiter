import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';

import moment from "moment/moment";
import localization from 'moment/locale/pt';
moment.updateLocale('pt', localization);

import styles from './style';

export default function Clock() {
   const [actualHour, setActualHour] = useState('');

   useEffect(() => {
      // Obtem a data e hora atual (horário de Brasília) e a retorna para o state
      setInterval(() => {
         if (moment().format('HH') > 12 && moment().format('HH') <= 23) {
            setActualHour(moment().format('HH:mm'));
         } else {
            setActualHour(moment().format('HH:mm'));
         }
      }, 1000);
   }, []);

   return (
      <View style={styles.clockBox}>
         <Text style={styles.title}>{actualHour}h</Text>

         <Text style={styles.text}>
            <Image source={require('../../../../../../img/calendar.png')} style={{ width: 20, height: 20 }} />
            {
               moment().format(' dddd') + ',\n' +
               moment().format('DD') + ' de ' + moment().format('MMMM') + ' de ' +
               moment().format('YYYY')
            }
         </Text>
      </View>
   );
};