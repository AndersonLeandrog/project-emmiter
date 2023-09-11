import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
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
        backgroundColor: colors.whiteSmoke,
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
        backgroundColor: colors.blue,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;