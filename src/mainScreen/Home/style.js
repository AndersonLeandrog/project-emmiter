import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: 1400,
  },
  banner: {
    width: "100%",
    height: 250,
    marginTop: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.wh0,
  },
  bannerContainer: {
    width: "45%",
  },
  bannerQrContainer: {
    width: "45%",
    height: 180,
    backgroundColor: colors.wh1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;