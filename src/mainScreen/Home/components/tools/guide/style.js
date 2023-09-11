import { StyleSheet } from 'react-native';
import colors from '../../../../../config/colors';

const style = StyleSheet.create({
   container: {
      width: '100%',
      backgroundColor: colors.badge,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   guideBox: {
      width: '95%',
   },
   title: {
      width: '60%',
      fontSize: 16,
      fontStyle: 'italic',
      padding: 5,
      color: colors.white,
   },
   text: {
      width: '90%',
      fontSize: 14,
      fontStyle: 'italic',
      color: colors.whiteSmoke,
   },
   button: {
      position: 'absolute',
      top: 5,
      right: 5,
      width: 25,
      height: 25,
      borderRadius: 50,
      backgroundColor: colors.blue,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   }
});

export default style;