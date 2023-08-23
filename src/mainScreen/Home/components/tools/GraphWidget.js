import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import firestore from '../../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from '../../style';

export default function Graph() {
   const [totalUsers, setTotalUsers] = useState(0);
   const [totalMasculineUsers, setTotalMasculineUsers] = useState(0);
   const [totalFeminineUsers, setTotalFeminineUsers] = useState(0);

   useEffect(() => {
      // Acessa o firebase/firestore e retorna o número de usuários cadastrados
      // sendo: número de usuários masculinos, femininos e o total de usuários
      setInterval(() => {
         (async function acessFirebase() {
            const querySnapshot = await getDocs(collection(firestore, 'user'));
            const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
            const totalUsersNumber = userData.length;
            // Desenvolver a lógica para retornar o número de usuários
            // femininos e masculinos
            setTotalUsers(totalUsersNumber); // Número total de usuários
         })();
      }, 500);
   });

   return (
      <>
         <View style={{...styles.userGraphic}}>
            <View style={{...styles.userGraphicIndication}}>
               <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={{color: 'crimson', }}>{totalFeminineUsers === null ? '0' : totalFeminineUsers}</Text>
                  <View style={{width: 50, height: totalFeminineUsers  === null ? 2 : (totalFeminineUsers/2) - 100, backgroundColor: 'crimson'}}/>
               </View>

               <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={{color: '#016afb', }}>{totalMasculineUsers === null ? '0' : totalMasculineUsers}</Text>
                  <View style={{width: 50, height: totalMasculineUsers === null ? 2 : (totalMasculineUsers/2) - 100, backgroundColor: '#016afb'}}/>
               </View>

               <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={{color: 'green', }}>{totalUsers === 0 ? '0' : totalUsers}</Text>
                  <View style={{width: 50, height: totalUsers === 0 ? 2 : (totalUsers/2), backgroundColor: 'green'}}/>
               </View>
            </View>

            <View style={{...styles.indication, top: 15, left: 15, backgroundColor: 'crimson'}}/>
            <Text style={{...styles.indicationText, top: 15, left: 30, color: 'crimson'}}>feminino</Text>

            <View style={{...styles.indication, top: 30, left: 15, backgroundColor: '#016AFB'}}/>
            <Text style={{...styles.indicationText, top: 30, left: 30, color: '#016AFB'}}>masculino</Text>

            <View style={{...styles.indication, top: 45, left: 15, backgroundColor: 'green'}}/>
            <Text style={{...styles.indicationText, top: 45, left: 30, color: 'green'}}>total</Text>
         </View>
      </>
   );
};