import React, { useState } from "react";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import moment from "moment";
import { ChatRoom } from "../../types";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

export default function ChatListItem(props: ChatListItemProps) {
  const navigation = useNavigation();
  const { chatRoom } = props;
  const user = chatRoom.users[1];

  const [modalVisible, setModalVisible] = useState(false);
  const [active] = useState({
    name: user.name,
    image: user.imageUri,
  });

  const onClick = () => {
    navigation.navigate("ChatRoom", {
      id: chatRoom.id,
      name: user.name,
      image: user.imageUri,
    });
  };

  const showImage = () => {
    navigation.navigate("ShowImage", { name: user.name, image: user.imageUri });
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={{ width: "100%" }}>
            <Pressable
              style={styles.overlay}
              onPress={() => setModalVisible(false)}
            />
            <View style={styles.centeredView}>
              <View style={styles.activeNameContainer}>
                <Text style={styles.modalName}>{active.name}</Text>
              </View>
              <Pressable
                onPress={showImage}
                style={{
                  margin: 0,
                  padding: 0,
                  flex: 1,
                }}
              >
                {active.image ? (
                  <Image
                    source={{ uri: active.image }}
                    style={styles.avatarCentredView}
                  />
                ) : (
                  <View style={styles.emptyImageModal}>
                    <Ionicons name="md-person" size={200} color="white" />
                  </View>
                )}
              </Pressable>

              <View style={styles.iconsContainer}>
                <MaterialCommunityIcons
                  name="android-messages"
                  size={24}
                  color="green"
                />
                <MaterialIcons name="call" size={20} color="green" />
                <FontAwesome5 name="video" size={20} color="green" />
                <Ionicons
                  name="md-alert-circle-outline"
                  size={24}
                  color="green"
                />
              </View>
            </View>
          </View>
        </Modal>

        <Pressable onPress={() => setModalVisible(true)}>
          {user.imageUri ? (
            <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          ) : (
            <View style={styles.emptyImage}>
              <Ionicons name="md-person" size={50} color="white" />
            </View>
          )}
        </Pressable>
        <View style={styles.leftContainer}>
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.time}>
              {moment(chatRoom.lastMessage.createdAt).calendar()}
            </Text>
          </View>
          <Text style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
