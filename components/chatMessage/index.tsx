import React from "react";
import { View, Text, Image } from "react-native";
import { Message } from "../../types";
import styles from "./style";
import moment from "moment";

export type ChatMessageProps = {
  message: Message;
  image: String;
};

export default function ChatMessage(props: ChatMessageProps) {
  const { message, image } = props;

  const myMessage = () => {
    return message.user.id === "u1";
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          { backgroundColor: myMessage() ? "#DCF8C5" : "white" },
          { marginRight: myMessage() ? 0 : 50 },
          { marginLeft: myMessage() ? 50 : 0 },
        ]}
      >
        {!myMessage() && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.avatarCentredView} />
          </View>
        )}
        <View style={{ width: myMessage() ? "100%" : "85%" }}>
          <View style={styles.messageHeader}>
            {!myMessage() && (
              <Text style={styles.username}>{message.user.name}</Text>
            )}
          </View>
          <Text style={styles.text}>{message.content}</Text>
          <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
        </View>
      </View>
    </View>
  );
}
