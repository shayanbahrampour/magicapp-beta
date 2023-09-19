import React from "react";
import { Image, View } from "react-native";
import { Button } from "expo-ui-kit";
import { Block, Card, Icon, Text } from "../components";
import { COLORS } from "../constants";
import axios from "axios";

const databaseURL =
  "https://magicapp-2ef88-default-rtdb.asia-southeast1.firebasedatabase.app";

const headers = {
  apiKey: "AIzaSyDnjnDQ4C8j-73yWfJf-1v00ZvGGRRt9hk",
  authDomain: "magicapp-2ef88.firebaseapp.com",
  projectId: "magicapp-2ef88",
  storageBucket: "magicapp-2ef88.appspot.com",
  messagingSenderId: "598107558393",
  appId: "1:598107558393:web:826c097d682fc14009ad28",
  measurementId: "G-THLE45LQ04",
};

const Read = ({ route }) => {
  const { item } = route.params;
  const [posts, setPosts] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  React.useEffect(() => {
    axios
      .get(`${databaseURL}/${item}.json`, { headers })
      .then((response) => {
        const data = response.data;
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching data from Firebase:", error);
      });
  }, []);

  const nextPage = () => {
    if (counter !== posts.length - 1) setCounter(counter + 1);
  };
  const prevPage = () => {
    if (counter !== 0) setCounter(counter - 1);
  };
  return (
    <View>
      <View style={{ height: "90%" }}>
        <Card
          margin={[0, 24, 18, 24]}
          style={{
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: 24,
          }}
        >
          {posts[counter]?.text && (
            <Text
              h3
              style={{
                textAlign: "center",
                paddingLeft: 16,
                paddingRight: 16,
                marginBottom: 36,
                fontSize: 16,
              }}
            >
              {posts[counter].text}
            </Text>
          )}

          {posts[counter]?.image && (
            <Image
              resizeMode="cover"
              source={{ uri: posts[counter]?.image }}
              style={{ flex: 1, borderRadius: 10 }}
            />
          )}
        </Card>
      </View>
      <Block
        margin={[0, 24, 18, 24]}
        style={{ flexDirection: "row" }}
        space="between"
      >
        <Button
          width="40%"
          color="white"
          style={{ height: 60 }}
          onPress={() => {
            nextPage();
          }}
        >
          <Block row center middle margin={[18, 21]}>
            <Icon name="arrowLeft" color={COLORS.black} />
            <Text
              bold
              marginLeft={10}
              style={{ fontSize: 14 }}
              weight="SemiBold"
            >
              صفحه بعد
            </Text>
          </Block>
        </Button>
        <Button
          width="40%"
          color="white"
          style={{ height: 60 }}
          onPress={() => {
            prevPage();
          }}
        >
          <Block row center middle margin={[18, 21]}>
            <Text
              bold
              marginRight={10}
              style={{ fontSize: 14 }}
              weight="SemiBold"
            >
              صفحه قبل
            </Text>
            <Icon name="arrowRight" color={COLORS.black} />
          </Block>
        </Button>
      </Block>
    </View>
  );
};

export default Read;
