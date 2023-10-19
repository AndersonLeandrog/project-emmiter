import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.wh0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
    Information: {
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: colors.wh1,
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
        backgroundColor: colors.bl0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;