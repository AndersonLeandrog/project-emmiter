import { StyleSheet } from "react-native";
import colors from "../../../../../config/colors";
import fontSize from "../../../../../config/fontSize";

const styles = StyleSheet.create({
   socialContainer: {
      position: "absolute",
      width: "100%",
      height: 232,
      bottom: 0,
      marginTop: 2,
      backgroundColor: colors.wh1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
   },
   socialBox: {
      width: 300,
      height: 50,
      borderRadius: 50,
      backgroundColor: colors.wh0,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
   },
   socialText: {
      fontSize: fontSize.normal,
      color: colors.bk0,
      paddingLeft: 5,
   },
});

export default styles;