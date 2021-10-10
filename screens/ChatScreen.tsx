import React, {useEffect, useState} from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { View } from "../components/Themed";
import ChatListItem from "../components/chatListRow";
import {API, graphqlOperation, Auth} from 'aws-amplify';
import NewMessageButton from "../components/newMessageButton";
import {getUser} from './queries';

export default function ChatScreen() {

  const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser()

        const userData: any = await API.graphql(
          graphqlOperation(
            getUser,
            {
              id: userInfo.attributes.sub
            }
          )
        )
        setChatRooms(userData.data.getUser.chatRoomUser.items)
      } catch (error) {
        console.log(error)
      }
    }
    fetchChatRoom();
  },[])

  

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }: any) => <ChatListItem chatRoom={item.chatRoom} />}
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
