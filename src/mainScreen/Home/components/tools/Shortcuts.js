import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Imports { arquivos de estilo }
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../config/colors';
import styles from "../../style";

export default function Short() {
   const navigation = useNavigation();
   return (
      <View style={{...styles.options}}>
         <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'
            }}
         > 
            <TouchableOpacity 
            onPress={() => {navigation.navigate('Add')}}
            style={{...styles.items, marginLeft: 15}}
            >
               <AntDesign name='adduser' size={24} color={colors.black} />
               <Text style={{color: colors.black}}>{'  Adicionar\n  Usuário'}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => {navigation.navigate('List')}}
            style={{...styles.items, marginLeft: 10}}
            >
               <AntDesign name='inbox' size={24} color={colors.black} />
               <Text style={{color: colors.black}}>{'  Gerenciar\n  Usuários'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{...styles.items, marginLeft: 10}}>
               <AntDesign name='edit' size={24} color={colors.black} />
               <Text style={{color: colors.black}}>{'  Editar um\n  Usuário'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{...styles.items, marginLeft: 10}}>
               <AntDesign name='deleteuser' size={24} color={colors.black} />
               <Text style={{color: colors.black}}>{'  Remover\n  usuário'}</Text>
            </TouchableOpacity>
         </ScrollView>
      </View>
   );
};