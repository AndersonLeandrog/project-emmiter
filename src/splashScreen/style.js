import { StyleSheet } from "react-native";
import colors from "../config/colors";
import fontSize from "../config/fontSize";

const style = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.wh0,
   },
   description: {
      width: 350,
      fontStyle: "italic",
      fontSize: fontSize.large,
      color: colors.bk0,
   },
   button: {
      position: "absolute",
      bottom: 50,
      width: 210,
      height: 50,
      borderRadius: 15,
      backgroundColor: colors.bl0,
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
   }
});

export default style;