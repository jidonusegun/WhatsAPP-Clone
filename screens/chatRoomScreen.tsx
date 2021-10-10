import React, {useEffect, useState} from "react";
import { ImageBackground, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import ChatMessage from "../components/chatMessage";
import InputBox from "../components/inputBox";
import background from "./backgroundImage";
import {AnalyticsProvider, API, Auth, graphqlOperation} from 'aws-amplify';
import { messagesByChatRoom } from '../src/graphql/queries';

export default function ChatRoomScreen() {
  const route: any = useRoute();
  const [messages, setMessages] = useState([])
  const [myID, setMyID] = useState<any>();

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesData: any = await API.graphql(
        graphqlOperation(
          messagesByChatRoom, {
            chatRoomID: route.params.id,
            sortDirection: "DESC"
          }
        )
      )
      setMessages(messagesData.data.messagesByChatRoom.items)
    }
    fetchMessages();
  },[]);

  useEffect(() => {
    const getMyID = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyID(userInfo.attributes.sub)
    }
    getMyID();
  },[])
  return (
    <ImageBackground
      source={background}
      style={{ width: "100%", height: "100%" }}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <ChatMessage myId={myID} message={item} image={route.params.image} />
        )}
        inverted
      />
      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
}
