import { StyleSheet } from "react-native";
import colors from "../../../../../config/colors";

const styles = StyleSheet.create({
   options: {
      width: '100%',
      height: 90,
      backgroundColor: colors.white,
      display: 'flex',
      justifyContent: 'space-evenly'
   },
   items: {
      width: 120,
      height: 50,
      borderRadius: 50,
      backgroundColor: colors.whiteSmoke,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   },
});

export default styles;