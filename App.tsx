import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { withAuthenticator, AmplifyTheme,  } from 'aws-amplify-react-native'
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify'
import config from './src/aws-exports'
import {getUser} from './src/graphql/queries';
import {createUser} from './src/graphql/mutations';
Amplify.configure(config)

const authTheme = {
  ...AmplifyTheme,
  forgotPassword: {
      color: 'red'
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "#0C6157"
  }
}

const randomImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQexPf-OJl1A6gCkrJCe5c65cmHrCuphVEq_A&usqp=CAU',
  'https://scontent.fabv2-1.fna.fbcdn.net/v/t39.30808-6/241889091_4427106330730555_2158574559403244072_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeGOxqnRLpGP1kevJL0x26xHiAjGu6T52baICMa7pPnZtidUvUu6e94lGqo8OwqUlCOiafi8vGOZqluk-TEDompa&_nc_ohc=JoVjR_hMRHYAX-obbwH&_nc_ht=scontent.fabv2-1.fna&oh=fafc20d82874f70e3a1326c6e3eb90bc&oe=61480998',
  'https://scontent.fkiv3-1.fna.fbcdn.net/v/t31.0-1/s200x200/22256588_1932617800312085_5686197942193420542_o.jpg?_nc_cat=110&_nc_sid=7206a8&_nc_eui2=AeF3UwtnAs3QLEJRnLSp4-hQxlokCBJZ6JPGWiQIElnok9HafHyjqv9D4bW9zeNFfNJlg5jLsvbewM7j5OD-OFy-&_nc_ohc=IxycgYSpqQEAX8EcTqI&_nc_ht=scontent.fkiv3-1.fna&tp=7&oh=640a83293bb75378958d22b633302f1b&oe=5F9F4BB7',
  'https://image.shutterstock.com/image-vector/super-mom-hero-superhero-cartoon-600w-720015928.jpg',
  'https://lkbkspro.s3.amazonaws.com/atelier-management/gs_58d933b8-98b4-468e-b229-43100a9620a7.jpg',
];

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImages = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)]
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});

      if(userInfo) {
        const userData = await API.graphql(
          graphqlOperation(
            getUser,
            {id: userInfo.attributes.sub}
            )
          )
        
          if(userData.data.getUser) {
            console.log("User already exit in the database")
            return
          }
          const newUser = {
            id: userInfo.attributes.sub,
            name: userInfo.username,
            imageUri: getRandomImages(),
            status: "Hey, I am using WhatsApp"
          }

          await API.graphql(graphqlOperation(createUser, {input: newUser}))
      }
    }
    fetchUser();
  },[])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
export default withAuthenticator(App, { theme: authTheme })