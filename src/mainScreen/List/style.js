import { StyleSheet } from "react-native";

// Define as cores padrão do aplicativo
const color = {
   background: '#fff',
   itemBackground: '#1b1c20',
   buttonBackground: '#2f3037',
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: 800, 
      backgroundColor: color.background,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
   },
   userBox: {
      width: '90%',
      height: 50,
      borderRadius: 10,
      backgroundColor: color.buttonBackground,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
   }
});

export default styles;