import { StyleSheet } from 'react-native';

// Define as cores padrão do aplicativo
const color = {
   background: '#29EF60',
   itemBackground: '#1b1c20',
   buttonBackground: '#000',
   textColor: '#000'
};

const style = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.background,
   },
   description: {
      width: 350,
      fontStyle: 'italic', 
      fontSize: 16, 
      color: color.textColor,
   },
   button: {
      position: 'absolute', 
      bottom: 50, 
      width: 210, 
      height: 50, 
      borderRadius: 15,
      backgroundColor: color.buttonBackground,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   }
});

export default style;