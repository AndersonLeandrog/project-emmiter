import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: 800,
      backgroundColor: colors.white,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   userBox: {
      width: '90%',
      height: 50,
      borderRadius: 10,
      backgroundColor: colors.gray,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
   },
   flatListContainer: {
      width: '100%',
      borderRadius: 10,
      backgroundColor: colors.whiteSmoke,
      display: 'flex', flexDirection: 'row',
      alignItems: 'center',
   },
   iconContainer: {
      width: '10%',
      display: 'flex',
      alignItems: 'center',
   }
});

export default styles;