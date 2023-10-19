import { StyleSheet } from "react-native";
import colors from "../../../../../config/colors";
import fontSize from "../../../../../config/fontSize";

const style = StyleSheet.create({
   container: {
      width: "100%",
      backgroundColor: colors.bl1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   guideBox: {
      width: "95%",
   },
   title: {
      width: "60%",
      fontSize: fontSize.normal,
      fontStyle: "italic",
      padding: 5,
      color: colors.wh0,
   },
   text: {
      width: "90%",
      fontSize: fontSize.medium,
      fontStyle: "italic",
      color: colors.wh0,
   },
   button: {
      position: "absolute",
      top: 5,
      right: 5,
      width: 25,
      height: 25,
      borderRadius: 50,
      backgroundColor: colors.bl0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   }
});

export default style;