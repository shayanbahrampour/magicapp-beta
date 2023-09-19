import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Block, Card, Icon, Text, Modal as CustomModal } from "../components";
import { mock, COLORS, SIZES } from "../constants";
import { useStaturBar } from "../utils/hooks";
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

const Post = ({ post, ...props }) => {
  const navigation = useNavigation();

  return (
    <CustomModal
      {...props}
      backdropColor={COLORS.gray}
      style={{ marginTop: SIZES.base * 4.5 }}
    >
      <Block white paddingHorizontal={24}>
        <Image
          resizeMode="cover"
          source={post?.images?.[0]}
          style={{
            height: 168,
            width: "100%",
            borderRadius: 12,
          }}
        />
        {post?.title && (
          <Text h2 bold marginTop={24}>
            {post?.title}
          </Text>
        )}
        <Block row marginVertical={24}>
          <Image source={post?.user?.avatar} style={styles.avatar} />
          <Block marginLeft>
            <Text title semibold>
              {post?.user?.name}
            </Text>
          </Block>
        </Block>
        <Text title gray>
          {post?.description}
        </Text>
      </Block>

      <Block
        row
        black
        middle
        space="between"
        paddingHorizontal={30}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          borderTopLeftRadius: SIZES.radius * 2.66,
          borderTopRightRadius: SIZES.radius * 2.66,
        }}
      >
        <Block row center marginTop={40} marginBottom={60}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <Block row center marginRight={28}>
              <Icon name="heartOutlined" color={COLORS.error} size={14} />
              <Text white title semibold marginLeft={5}>
                {post?.likes}
              </Text>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              props.onSwipeComplete();
              navigation.navigate("Comments", { comments: post?.comments });
            }}
          >
            <Block row center marginRight={28}>
              <Icon name="comment" color={COLORS.white} size={14} />
              <Text white title semibold marginLeft={5}>
                {post?.comments?.length}
              </Text>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <Block row center>
              <Icon name="share" color={COLORS.white} size={14} />
              <Text white title semibold marginLeft={5}>
                Share
              </Text>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </CustomModal>
  );
};
const Home = ({ navigation, stories = mock.STORIES }) => {
  useStaturBar("dark-content");
  const [post, setPost] = React.useState(false);

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${databaseURL}/books.json`, { headers })
      .then((response) => {
        const data = response.data;
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPosts(dataArray);
      })
      .catch((error) => {
        console.error("Error fetching data from Firebase:", error);
      });
  }, []);

  return (
    <Block>
      <FlatList
        data={posts}
        keyExtractor={(item) => `${item.u_id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 24, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Card margin={[0, 24, 18, 24]} padding={18}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              marginBottom={28}
            >
              <Text
                title
                semibold
                marginRight
                weight={"Bold"}
                style={{ fontSize: 14 }}
              >
                {item?.author}
              </Text>
              <Image source={mock.USERS.user_1.avatar} style={styles.avatar} />
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate("Read", { item: item.id })}
            >
              {item?.cover && (
                <Block
                  radius={8}
                  height={150}
                  overflow="hidden"
                  marginTop={-10}
                  marginBottom={18}
                >
                  <Image
                    resizeMode="cover"
                    source={{ uri: item?.cover }}
                    style={{ height: 150, width: "100%" }}
                  />
                </Block>
              )}
              <View
                style={{
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {Boolean(item?.title) && (
                  <Text
                    style={{ textAlign: "right", fontSize: 16 }}
                    weight={"Bold"}
                    h3
                    bold
                    marginBottom={8}
                  >
                    {item?.title}
                  </Text>
                )}
                {Boolean(item?.description) && (
                  <Text style={{ textAlign: "right", fontSize: 14 }} title gray>
                    {item?.description}
                  </Text>
                )}
              </View>
              {item?.images?.length > 1 && (
                <Block row marginTop={18}>
                  <Block
                    flex={2}
                    radius={8}
                    height={160}
                    marginRight={10}
                    overflow="hidden"
                  >
                    <Image
                      resizeMode="cover"
                      style={{ height: 160 }}
                      source={item?.images?.[0]}
                    />
                  </Block>
                  <Block noflex>
                    <Block
                      radius={8}
                      height={75}
                      width={80}
                      marginBottom={10}
                      overflow="hidden"
                    >
                      <Image
                        resizeMode="cover"
                        source={item?.images?.[1]}
                        style={{ height: 75, width: 80 }}
                      />
                    </Block>
                    <Block radius={8} height={75} width={80} overflow="hidden">
                      <Image
                        resizeMode="cover"
                        source={item?.images?.[2]}
                        style={{ height: 75, width: 80 }}
                      />
                      <Block row middle center style={styles.imagesCount}>
                        <Icon name="camera" />
                        <Text white marginLeft={5} semibold>
                          {item?.images?.length - 2}
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              )}
            </TouchableOpacity>
          </Card>
        )}
      />
      <Post
        post={post}
        isVisible={Boolean(post)}
        onSwipeComplete={() => setPost(false)}
      />
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({
  avatar: {
    borderColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 2,
    height: 44,
    width: 44,
  },
  imagesCount: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
});
