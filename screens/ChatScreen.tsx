import * as React from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import ChatListItem from "../components/chatListRow";
import chatRooms from "../data/ChatRooms";
import NewMessageButton from "../components/newMessageButton";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"Chats">) {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
