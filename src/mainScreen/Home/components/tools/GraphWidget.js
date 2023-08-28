import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

// import { arquivos do firebase/firestore e react-native-picker }
import firestore from '../../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Imports { arquivos de estilo }
import colors from '../../../../config/colors';
import styles from '../../style';

export default function Graph() {
   const [totalUsers, setTotalUsers] = useState(0);
   const [totalMasculineUsers, setTotalMasculineUsers] = useState(0);
   const [totalFeminineUsers, setTotalFeminineUsers] = useState(0);

   useEffect(() => {
      const acessFirebase = async () => {
         const querySnapshot = await getDocs(collection(firestore, 'user'));
         const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
         const totalUsersNumber = userData.length;

         let masculinoCount = 0;
         let femininoCount = 0;

         for (const usuario of userData) {
            const gender = usuario.gender.toLowerCase();

            if (gender === 'masculino') {
               masculinoCount++;
            } else if (gender === 'feminino') {
               femininoCount++;
            }
         }

         setTotalUsers(totalUsersNumber); // Define o total de usuários incluindo masculinos e femininos
         setTotalMasculineUsers(masculinoCount); // Define o total de usuários masculinos
         setTotalFeminineUsers(femininoCount); // Define o total de usuários femininos
      };

      // Execute a função ao montar o componente e a cada 500 milissegundos
      const intervalId = setInterval(acessFirebase, 500);

      // Limpe o intervalo quando o componente for desmontado
      return () => clearInterval(intervalId);
   }, []);

   return (
      <>
         <View style={{ ...styles.userGraphic }}>
            <View style={{ ...styles.userGraphicIndication }}>
               <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text style={{ color: colors.red, }}>{totalFeminineUsers === null ? '0' : totalFeminineUsers}</Text>
                  <View style={{ width: 50, height: totalFeminineUsers === 0 ? 2 : (totalFeminineUsers / 2), backgroundColor: colors.red }} />
               </View>

               <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text style={{ color: colors.blue, }}>{totalMasculineUsers === null ? '0' : totalMasculineUsers}</Text>
                  <View style={{ width: 50, height: totalMasculineUsers === 0 ? 2 : (totalMasculineUsers / 2), backgroundColor: colors.blue }} />
               </View>

               <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text style={{ color: colors.green, }}>{totalUsers === 0 ? '0' : totalUsers}</Text>
                  <View style={{ width: 50, height: totalUsers === 0 ? 2 : (totalUsers / 2), backgroundColor: colors.green }} />
               </View>
            </View>

            <View style={{ ...styles.indication, top: 15, left: 15, backgroundColor: colors.red }} />
            <Text style={{ ...styles.indicationText, top: 15, left: 30, color: colors.red }}>feminino</Text>

            <View style={{ ...styles.indication, top: 30, left: 15, backgroundColor: colors.blue }} />
            <Text style={{ ...styles.indicationText, top: 30, left: 30, color: colors.blue }}>masculino</Text>

            <View style={{ ...styles.indication, top: 45, left: 15, backgroundColor: colors.green }} />
            <Text style={{ ...styles.indicationText, top: 45, left: 30, color: colors.green }}>total</Text>
         </View>
      </>
   );
};