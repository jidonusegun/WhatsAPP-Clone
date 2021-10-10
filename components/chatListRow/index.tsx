import React, { useState, useEffect } from "react";
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
import {Auth} from 'aws-amplify';
import { ChatRoom } from "../../types";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

export default function ChatListItem(props: ChatListItemProps) {
  const navigation = useNavigation();
  const [otherUser, setOtherUser] = useState({
    name: "",
    imageUri: "",
    status: ""
  });
  const { chatRoom } = props;

  useEffect(() => {
    const getOtherUser = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        if(chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
          setOtherUser(chatRoom.chatRoomUsers.items[1].user)
        } else {
          setOtherUser(chatRoom.chatRoomUsers.items[0].user)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getOtherUser();
  },[])

  const [modalVisible, setModalVisible] = useState(false);
  const [active] = useState({
    name: otherUser?.name,
    image: otherUser?.imageUri,
  });

  if(!otherUser) {
    return null
  }

  const onClick = () => {
    navigation.navigate<any>("ChatRoom", {
      id: chatRoom.id,
      name: otherUser.name,
      image: otherUser.imageUri,
    });
  };

  const showImage = () => {
    navigation.navigate<any>("ShowImage", { name: otherUser.name as any, image: otherUser.imageUri as any });
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
          {otherUser.imageUri ? (
            <Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />
          ) : (
            <View style={styles.emptyImage}>
              <Ionicons name="md-person" size={50} color="white" />
            </View>
          )}
        </Pressable>
        <View style={styles.leftContainer}>
          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.name}</Text>
            {/* <Text style={styles.time}>
              {chatRoom.lastMessage.createdAt && moment(chatRoom.lastMessage.createdAt).calendar()}
            </Text> */}
          </View>
          <Text style={styles.lastMessage}>{otherUser.status}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
