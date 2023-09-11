import { StyleSheet } from "react-native";
import colors from "../../../../../config/colors";

const styles = StyleSheet.create({
   clockBox: {
      width: '100%',
      backgroundColor: colors.white,
      display: 'flex',
      justifyContent: 'center',
   },
   title: {
      fontSize: 32,
      fontWeight: '500',
      color: colors.black,
      paddingLeft: 15,
      paddingTop: 30,
   },
   text: {
      fontSize: 16,
      fontStyle: 'italic',
      color: colors.lightBlack,
      paddingLeft: 20,
   },
});

export default styles;