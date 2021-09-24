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
  status: {
    fontSize: 16,
    color: "grey",
  },
});

export default styles;
