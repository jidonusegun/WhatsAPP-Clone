import * as React from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import ContactListItem from "../components/ContactListItem";
import users from "../data/Users";

export default function Contact({ navigation }: RootTabScreenProps<"Chats">) {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
