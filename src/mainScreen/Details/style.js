import { StyleSheet } from "react-native";
import colors from "../../config/colors";
import fontSize from "../../config/fontSize";

const styles = StyleSheet.create({
   container: {
      width: "100%",
      height: 1300,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: colors.wh0,
   },
   boxInfo: {
      width: 18,
      height: 18,
      borderRadius: 50,
      backgroundColor: colors.bl0,
   },
   info: {
      fontStyle: "italic",
      paddingLeft: 5,
      color: colors.bk1,
   },
   viewShotComponent: {
      width: "95%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   userBox: {
      width: "90%",
      height: 850,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.bk1,
      backgroundColor: colors.wh1,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
   },
   title: {
      fontSize: fontSize.veryLarge,
      marginTop: 25,
      marginLeft: 25,
      marginRight: 10,
      borderRadius: 15,
      color: colors.bk0,
   },
   text: {
      fontSize: fontSize.normal,
      textAlign: "justify",
      marginLeft: 25,
      marginRight: 10,
      borderRadius: 10,
      color: colors.bk0,
   },
   characterCounterFloatBox: {
      position: "absolute",
      top: 5,
      right: 5,
      display: "flex",
      flexDirection: "row",
   },
   characterCounter: {
      height: 15,
      borderRadius: 10,
      fontSize: fontSize.medium,
      paddingLeft: 2.5,
      color: colors.wh0,
      backgroundColor: colors.bl1,
   },
   checkButton: {
      width: 15,
      height: 15,
      marginLeft: 5,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.bl0,
   },
   buttonBox: {
      width: "90%",
      height: 50,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
   },
   input: {
      fontWeight: "500",
      color: colors.bk1,
      paddingLeft: 10,
      width: "90%",
      height: 35,
   }
});

export default styles;