import { StyleSheet } from "react-native";

// Define as cores padrão do aplicativo
const color = {
    background: '#fff',
    itemBackground: '#1b1c20',
    inputBackgroundColor: '#ebebeb',
    button: '#29EF60'
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: color.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    Information: {
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: color.inputBackgroundColor,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: '10%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: '90%',
    },
    button: {
        width: 120,
        height: 50,
        borderRadius: 10,
        backgroundColor: color.button,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;