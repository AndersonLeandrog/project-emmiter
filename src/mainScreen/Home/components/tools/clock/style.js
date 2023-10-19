import { StyleSheet } from "react-native";
import colors from "../../../../../config/colors";
import fontSize from "../../../../../config/fontSize";

const styles = StyleSheet.create({
   clockBox: {
      width: "100%",
      backgroundColor: colors.wh0,
      display: "flex",
      justifyContent: "center",
   },
   title: {
      fontSize: fontSize.extraLarge,
      fontWeight: "500",
      color: colors.bk0,
      paddingLeft: 15,
      paddingTop: 30,
   },
   text: {
      fontSize: fontSize.large,
      fontStyle: "italic",
      color: colors.bk1,
      paddingLeft: 20,
   },
});

export default styles;