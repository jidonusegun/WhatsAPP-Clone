import React from "react";
import { ImageBackground, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import ChatMessage from "../components/chatMessage";
import chats from "../data/Chats";
import InputBox from "../components/inputBox";
import background from "./backgroundImage";
import styles from "./style";

export default function ChatRoomScreen() {
  const route = useRoute();
  return (
    <ImageBackground
      source={background}
      style={{ width: "100%", height: "100%" }}
    >
      <FlatList
        data={chats.messages}
        renderItem={({ item }) => (
          <ChatMessage message={item} image={route.params.image} />
        )}
        keyExtractor={(item) => item.id}
        inverted
      />
      <InputBox />
    </ImageBackground>
  );
}
