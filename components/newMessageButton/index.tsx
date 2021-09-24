import React from "react";
import styles from "./style";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function NewMessageButton() {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("Contacts");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="message-reply-text"
          size={28}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}
