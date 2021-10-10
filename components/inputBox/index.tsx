import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import styles from "./style";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import {API, Auth, graphqlOperation} from 'aws-amplify';
import { createMessage } from '../../src/graphql/mutations'

export default function InputBox({chatRoomID}: any) {
  const [message, setMessage] = useState("");
  const [userID, setUserID] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUserID(userInfo.attributes.sub)
    } 
    fetchUser();
  })

  const onMicrophonePress = () => {
    console.warn("Microphone");
  };
  const onSendPress = async () => {
    try {
      await API.graphql(
        graphqlOperation(
          createMessage, {
            input: {
              content: message,
              userID,
              chatRoomID
            }
          }
        )
      )
    } catch (error) {
      console.log(error)
    }
    setMessage("");
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          onChangeText={setMessage}
          value={message}
          multiline
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!message && (
          <Fontisto name="camera" size={24} color="grey" style={styles.icon} />
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message ? (
            <MaterialCommunityIcons name="microphone" size={26} color="white" />
          ) : (
            <MaterialIcons name="send" size={28} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
