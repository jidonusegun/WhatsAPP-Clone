import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default styles;
