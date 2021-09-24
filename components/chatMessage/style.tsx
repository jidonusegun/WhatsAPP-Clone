import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    zIndex: 100,
  },
  text: {
    color: "black",
  },
  messageBox: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 10,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.light.tint,
  },
  imageContainer: {
    flexDirection: "row",
  },
  time: {
    color: "grey",
    alignSelf: "flex-end",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  avatarCentredView: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default styles;
