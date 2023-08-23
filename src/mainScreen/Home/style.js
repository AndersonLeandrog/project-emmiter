import { StyleSheet } from "react-native";

// Define as cores padrão do aplicativo
const color = {
  background: '#fff',
  buttonBackground: '#ebebeb',
  banner: '#29EF60'
};

const styles = StyleSheet.create({
  container: {
   width: '100%',
   height: 1107,
   backgroundColor: color.background,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center'
  },
  LogoBox: {
    width: '100%',
    height: 180,
    backgroundColor: color.banner,
    display: 'flex',
    justifyContent: 'center',
  },
  banner: {
   width: '100%',
   height: 250, 
   marginTop: 2,
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-around',
   alignItems: 'center',
   backgroundColor: color.background,
  },
  bannerContainer: {
    width: '45%',
  },
  bannerQrContainer: {
    width: '45%',
    height: 180,
    backgroundColor: color.buttonBackground,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
   width: '100%',
   height: 90,
   backgroundColor: color.background,
   display: 'flex',
   justifyContent: 'space-evenly'
  },
  items: {
   width: 120,
   height: 50,
   borderRadius: 50,
   backgroundColor: color.buttonBackground,
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center'
  },
  userGraphic: {
   width: '100%',
   height: 250,
   marginTop: 2,
   backgroundColor: color.buttonBackground,
   display: 'flex',
   justifyContent: 'flex-end',
   alignItems: 'center'
  },
  userGraphicIndication: {
    width: 180,
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  indication: {
    position: 'absolute',
    width: 5, 
    height: 5, 
    borderRadius: 50
  },
  indicationText: {
    position: 'absolute', 
    fontSize: 12
  },
  socialContainer: {
   position: 'absolute',
   width: '100%',
   height: 232,
   bottom: 0,
   marginTop: 2,
   backgroundColor: color.buttonBackground,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center'
  },
  socialBox: {
   width: 300,
   height: 50,
   borderRadius: 50,
   backgroundColor: color.background,
   display: 'flex', 
   flexDirection: 'row', 
   justifyContent: 'center', 
   alignItems: 'center'
  },
  clockBox: {
   width: '100%',
   backgroundColor: color.background,
   display: 'flex',
   justifyContent: 'center',
  }
});

export default styles;