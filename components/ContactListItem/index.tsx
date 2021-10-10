import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { User } from "../../types";
import { useNavigation } from "@react-navigation/native";
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom, createChatRoomUser} from '../../src/graphql/mutations'
import styles from "./style";

export type ContactListItemProps = {
  user: User;
};

export default function ContactListItem(props: ContactListItemProps) {
  const navigation = useNavigation();
  const { user } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [active] = useState({
    name: user.name,
    image: user.imageUri,
  });

  const onClick = async () => {
    try {
      const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, {input: {}}))

      if(!newChatRoomData.data) {
        return
      }

      const newChatRoom = newChatRoomData.data.createChatRoom

      await API.graphql(
        graphqlOperation(
          createChatRoomUser, 
          {
            input: {
              userID: user.id,
              chatRoomID: newChatRoom.id
            }
          }
        )
      )

      const userInfo = await Auth.currentAuthenticatedUser();

      await API.graphql(
        graphqlOperation(
          createChatRoomUser, 
          {
            input: {
              userID: userInfo.attributes.sub,
              chatRoomID: newChatRoom.id
            }
          }
        )
      )
      navigation.navigate("ChatRoom", {
        id: newChatRoom.id,
        user: "HardCoded Here" 
      })
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
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
          </View>
          <Text style={styles.status}>
            {user.status.length > 30
              ? user.status.substring(0, 30 - 3) + "..."
              : user.status}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
