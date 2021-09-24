import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  emptyImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
    backgroundColor: "#c4c5ca",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImageModal: {
    height: "90%",
    width: "100%",
    backgroundColor: "#c4c5ca",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
  },
  leftContainer: {
    flex: 1,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "#eeeeee",
  },
  midContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
  },
  lastMessage: {
    fontSize: 16,
    color: "grey",
    marginTop: 10,
  },
  time: {
    fontSize: 16,
    color: "grey",
  },
  centeredView: {
    height: 300,
    width: 250,
    marginVertical: Dimensions.get("window").width - 450 / 2,
    marginHorizontal: Dimensions.get("window").width - 620 / 2,
    position: "relative",
  },
  activeNameContainer: {
    height: 35,
    width: "100%",
    zIndex: 1,
    alignItems: "flex-start",
    paddingLeft: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    position: "absolute",
    top: 0,
    left: 0,
  },
  modalName: {
    fontSize: 20,
    color: "white",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "400%",
    position: "absolute",
    left: 0,
    right: 0,
    top: "-20%",
    bottom: 0,
  },
  avatarCentredView: {
    height: "90%",
    width: "100%",
    flex: 1,
  },
  iconsContainer: {
    height: 50,
    margin: 0,
    borderTopColor: "#ccc",
    backgroundColor: "white",
    borderTopWidth: 1,
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
});

export default styles;
