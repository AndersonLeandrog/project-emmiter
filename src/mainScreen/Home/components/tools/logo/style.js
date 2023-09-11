import { StyleSheet } from "react-native";
import colors from "../../../../../config/colors";

const styles = StyleSheet.create({
   LogoBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      height: 300,
      backgroundColor: colors.blue,
   },
   appBadge: {
      position: 'absolute',
      height: 25,
      borderRadius: 5,
      backgroundColor: colors.badge,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   imageButton: {
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: colors.black,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   infoBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   nameText: {
      fontSize: 23,
      fontStyle: 'italic',
      color: colors.white,
      paddingTop: 10,
   },
   descriptionText: {
      textAlign: 'center',
      fontSize: 14,
      fontStyle: 'italic',
      color: colors.white,
      paddingTop: 5,
   },
   boxModal: {
      position: 'absolute',
      top: 160,
      left: 20,
      width: '90%',
      height: 125,
      borderRadius: 10,
      backgroundColor: colors.white,
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
   },
   input: {
      width: '95%',
      height: 35,
      borderRadius: 5,
      color: colors.lightBlack,
      backgroundColor: colors.whiteSmoke,
   },
   buttonBox: {
      width: '95%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
   backButton: {
      width: 100,
      height: 35,
      borderRadius: 5,
      backgroundColor: colors.whiteSmoke,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   changeButton: {
      width: 80,
      height: 35,
      borderRadius: 5,
      marginLeft: 5,
      backgroundColor: colors.blue,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default styles;