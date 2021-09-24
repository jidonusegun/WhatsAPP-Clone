import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 50,
    flex: 1,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 3,
  },
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    marginRight: 5,
  },
});

export default styles;
