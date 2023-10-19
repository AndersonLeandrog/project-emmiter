import { StyleSheet } from "react-native";
import colors from "../../../../../config/colors";
import fontSize from "../../../../../config/fontSize";

const styles = StyleSheet.create({
   userGraphic: {
      width: "100%",
      height: 250,
      marginTop: 2,
      backgroundColor: colors.wh1,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
   },
   userGraphicIndication: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 35,
   },
   indication: {
      position: "absolute",
      width: 5,
      height: 5,
      borderRadius: 50
   },
   indicationText: {
      position: "absolute",
      fontSize: fontSize.medium,
   },
});

export default styles;