import React, {useEffect, useState} from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import ContactListItem from "../components/ContactListItem";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {listUsers} from '../src/graphql/queries';

export default function Contact({ navigation }: RootTabScreenProps<"Chats">) {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await API.graphql(graphqlOperation(listUsers))
        setUsers(userData.data.listUsers.items)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[])
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
