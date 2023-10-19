import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
   container: {
      width: "100%",
      height: 800,
      backgroundColor: colors.wh0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
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
   userBox: {
      width: "90%",
      height: 50,
      borderRadius: 10,
      backgroundColor: colors.gra0,
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
   },
   flatListContainer: {
      width: "100%",
      borderRadius: 10,
      backgroundColor: colors.wh1,
      display: "flex", flexDirection: "row",
      alignItems: "center",
   },
   iconContainer: {
      width: "10%",
      display: "flex",
      alignItems: "center",
   }
});

export default styles;