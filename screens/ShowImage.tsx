import React from "react";
import { View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ShowImage() {
  const route = useRoute();
  return (
    <View
      style={{
        justifyContent: "center",
        height: "100%",
        backgroundColor: "black",
      }}
    >
      {route.params.image ? (
        <Image
          source={{ uri: route.params.image }}
          style={{ width: "100%", height: 250 }}
        />
      ) : (
        <View
          style={{
            height: 250,
            width: "100%",
            backgroundColor: "#c4c5ca",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="md-person" size={200} color="white" />
        </View>
      )}
    </View>
  );
}
