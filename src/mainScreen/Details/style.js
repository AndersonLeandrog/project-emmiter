import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: 1200,
      backgroundColor: colors.white,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
   },
   userBox: {
      width: '90%',
      height: 750,
      borderRadius: 10,
      backgroundColor: colors.whiteSmoke,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   buttonBox: {
      width: '90%',
      height: 50,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   },
   input: {
      width: '90%',
      height: 50,
      borderRadius: 15,
      marginTop: 5,
      backgroundColor: colors.whiteSmoke
   }
});

export default styles;