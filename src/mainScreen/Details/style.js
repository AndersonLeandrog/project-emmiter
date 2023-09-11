import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: 1200,
      backgroundColor: colors.white,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
   },
   userBox: {
      width: '90%',
      height: 750,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.lightBlack,
      backgroundColor: colors.whiteSmoke,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   title: {
      fontFamily: 'Times New Roman, Arial, Calibri',
      fontSize: 23,
      paddingLeft: 25,
      paddingTop: 25,
      color: colors.black,
   },
   text: {
      fontFamily: 'Times New Roman, Arial, Calibri',
      fontSize: 14,
      paddingLeft: 25,
      color: colors.black
   },
   buttonBox: {
      width: '90%',
      height: 50,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   },
   input: {
      fontFamily: 'Times New Roman, Arial, Calibri',
      fontWeight: '500',
      color: colors.lightBlack,
      paddingLeft: 10,
      width: '90%',
      height: 35,
   }
});

export default styles;