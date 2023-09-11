import { StyleSheet } from "react-native";
import colors from "../../../../../config/colors";

const styles = StyleSheet.create({
   socialContainer: {
      position: 'absolute',
      width: '100%',
      height: 232,
      bottom: 0,
      marginTop: 2,
      backgroundColor: colors.whiteSmoke,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   socialBox: {
      width: 300,
      height: 50,
      borderRadius: 50,
      backgroundColor: colors.white,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   },
   socialText: {
      fontSize: 14,
      color: colors.black,
      paddingLeft: 5,
   },
});

export default styles;