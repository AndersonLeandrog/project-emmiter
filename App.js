import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';

// import { react-native-navigation e AsyncStorage }
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import AsyncStorage from '@react-native-async-storage/async-storage';

// import { arquivos de estilo }
import colors from './src/config/colors';

// import { arquivos de navegação }
import ScreenA from './src/splashScreen/Screen1';
import ScreenB from './src/splashScreen/Screen2';
import Home from './src/mainScreen/Home';
import AddUser from './src/mainScreen/Add';
import UserList from './src/mainScreen/List';
import Details from './src/mainScreen/Details';

export default function App() {
  const [route, setRoute] = useState('ScreenA');

  useEffect(() => {
    (async function getAsyncStorageData() {
      const screenState = await AsyncStorage.getItem('screen');
      const loadScreenState = await AsyncStorage.getItem('load');
      if (screenState === 'false' && loadScreenState === 'true') {
        // Previne que o usuário volte pressionando o botão de voltar do smartphone para
        // as telas definidas na pasta splashScreen
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => BackHandler.removeEventListener('hardwareBackPress', () => true);

        // Após inicializar o aplicativo pela primeira vez, 
        // ele passará a iniciar por padrão na tela 'Home' em vez de iniciar renderizando a tela de boas-vindas 'Welcome'
        setRoute('Home');
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={route}>
        <Stack.Screen name='ScreenA' component={ScreenA} options={{ headerShown: false }} />
        <Stack.Screen name='ScreenB' component={ScreenB} options={{ headerShown: false }} />

        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Painel de Controle',
            headerShown: false
          }}
        />

        <Stack.Screen
          name='Add'
          component={AddUser}
          options={{
            title: 'Cadastrar novo usuário',
            headerTintColor: colors.black,
            headerStyle: {
              backgroundColor: colors.green,
            }
          }}
        />

        <Stack.Screen
          name='List'
          component={UserList}
          options={{
            title: 'Lista de usuários',
            headerTintColor: colors.black,
            headerStyle: {
              backgroundColor: colors.green,
            }
          }}
        />

        <Stack.Screen
          name='Details'
          component={Details}
          options={{
            title: 'Detalhes do usuário',
            headerTintColor: colors.black,
            headerStyle: {
              backgroundColor: colors.green,
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
