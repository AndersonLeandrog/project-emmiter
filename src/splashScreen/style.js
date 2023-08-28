import { StyleSheet } from 'react-native';
import colors from '../config/colors';

const style = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.white,
   },
   description: {
      width: 350,
      fontStyle: 'italic', 
      fontSize: 16, 
      color: colors.black,
   },
   button: {
      position: 'absolute', 
      bottom: 50, 
      width: 210, 
      height: 50, 
      borderRadius: 15,
      backgroundColor: colors.whiteSmoke,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   }
});

export default style;