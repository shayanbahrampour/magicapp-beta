import React from "react";
import dayjs from "dayjs";
import { Utils } from "expo-ui-kit";
import {
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import MapView from "react-native-maps";
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

import { Block, Button, Card, Icon, Text, Modal } from "../components";
import { mock, COLORS, SIZES } from "../constants";
import { useStaturBar } from "../utils/hooks";

const EVENTS_TABS = [
  { id: "anytime", title: "امروز" },
  { id: "today", title: "ترند‌ها" },
  { id: "tomorrow", title: "تکنولوژی" },
  { id: "week", title: "تاریخی" },
  { id: "month", title: "استارت‌آپ" },
];

const Event = ({ event, ...props }) => {
  const gps = event?.address?.gps;
  return (
    <Modal
      {...props}
      style={{ marginTop: SIZES.base * 4.5 }}
      backdropColor={Utils.rgba(COLORS.gray, 0.3)}
    >
      <Block white paddingHorizontal={24} marginTop={-24}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: SIZES.padding * 7 }}
        >
          <TouchableWithoutFeedback>
            <Block>
              <Block row marginVertical>
                <Block>
                  <Block row>
                    <Image source={event?.user?.avatar} style={styles.avatar} />
                    <Block marginLeft>
                      <Text title semibold>
                        {event?.user?.name}
                      </Text>
                      <Text subtitle gray>
                        5min ago
                      </Text>
                    </Block>
                  </Block>
                </Block>
                <Block noflex>
                  <Button success style={{ maxHeight: 28, borderRadius: 4 }}>
                    <Block row center paddingHorizontal={12}>
                      <Icon name="check" color={COLORS.white} size={14} />
                      <Text title white marginLeft={3}>
                        خوانده شده
                      </Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Image
                resizeMode="cover"
                source={event?.image}
                style={{
                  height: 168,
                  width: "100%",
                  borderRadius: 12,
                }}
              />
              {event?.title && (
                <Text h2 bold marginVertical={18}>
                  {event?.title}
                </Text>
              )}
              <Block row>
                <Block>
                  <Block
                    noflex
                    center
                    middle
                    radius={12}
                    width={48}
                    height={48}
                    marginBottom={8}
                    color={COLORS.lightGray}
                  >
                    <Icon name="clock" color={COLORS.gray} />
                  </Block>
                  <Text title bold>
                    {dayjs(event?.date).format("DD MMMM, YYYY")}
                  </Text>
                  <Text gray caption>
                    From {dayjs(event?.date).format("HH:mma")}
                  </Text>
                </Block>
                <Block>
                  <Block
                    noflex
                    center
                    middle
                    radius={12}
                    width={48}
                    height={48}
                    marginBottom={8}
                    color={COLORS.lightGray}
                  >
                    <Icon name="currency" color={COLORS.gray} />
                  </Block>
                  <Text title bold>
                    ${event?.price}
                  </Text>
                  <Text gray caption>
                    Per event
                  </Text>
                </Block>
              </Block>
              <Block row wrap center marginTop={24} marginBottom={16}>
                <Text title bold marginRight>
                  Address
                </Text>
                <Text gray caption>
                  {event?.address?.street} {event?.address?.state}{" "}
                  {event?.address?.country}
                </Text>
              </Block>
              <Block>
                <MapView
                  style={{
                    height: 157,
                    borderRadius: 8,
                    ...StyleSheet.absoluteFillObject,
                  }}
                  region={{
                    latitude: gps.lat || 0,
                    longitude: gps.lng || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Block>
    </Modal>
  );
};

const Header = () => {
  const [tab, setTab] = React.useState("anytime");

  useStaturBar();

  const renderTab = (item, index) => {
    const isSelected = item.id === tab;
    const isFirst = !index;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => setTab(item.id)}>
        <Block noflex center marginRight={28}>
          <Text
            title
            gray={!isSelected}
            style={{ fontSize: 16 }}
            black={isSelected}
            weight={isSelected && "Bold"}
            marginLeft={isFirst ? 28 : 0}
          >
            {item.title}
          </Text>
          {isSelected && (
            <Block
              noflex
              black
              radius={5}
              width={5}
              marginTop={6}
              minHeight={5}
              marginLeft={isFirst ? 28 : 0}
            />
          )}
        </Block>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={EVENTS_TABS}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginBottom: 28 }}
      renderItem={({ item, index }) => renderTab(item, index)}
    />
  );
};

const Events = ({ events = mock.EVENTS }) => {
  const [event, setEvent] = React.useState(false);
  const [eventOptions, setEventOptions] = React.useState(false);

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

  useStaturBar();

  return (
    <Block>
      <FlatList
        data={posts}
        style={{ paddingTop: 28 }}
        contentContainerStyle={{ paddingBottom: 28 }}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Header />}
        renderItem={({ item }) => (
          <Card margin={[0, 24, 16, 24]} padding="2x">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setEvent(item)}
            >
              {item?.cover && (
                <Block radius={8} overflow="hidden" marginBottom="2x">
                  <Image
                    resizeMode="cover"
                    source={{ uri: item?.cover }}
                    style={{ height: 182, width: "100%" }}
                  />
                </Block>
              )}
            </TouchableOpacity>

            <Block
              row
              center
              marginBottom="2x"
              style={{
                width: "100%",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Block
                noflex
                center
                marginBottom={16}
                radius={12}
                minWidth={38}
                padding={[8, 10]}
                borderWidth={1.5}
                style={{ flexDirection: "row" }}
                borderColor={Utils.rgba(COLORS.gray, 0.2)}
              >
                <Icon
                  name="heartOutlined"
                  color={COLORS.gray}
                  size={14}
                  marginRight={8}
                />
                <Text h4 bold>
                  ۲۹
                </Text>
              </Block>

              {Boolean(item?.title) && (
                <Text h3 bold weight={"Bold"}>
                  {item?.title}
                </Text>
              )}
              <Block>
                <Text gray caption marginBottom={8}>
                  {item?.author}
                </Text>
              </Block>
            </Block>
            <Block row space="between" marginTop={8}>
              <Button success style={{ maxHeight: 28, borderRadius: 4 }}>
                <Block row center paddingHorizontal={12}>
                  <Icon name="check" color={COLORS.white} size={14} />
                  <Text h4 white marginLeft={3}>
                    خوانده شده
                  </Text>
                </Block>
              </Button>
              <Block row>
                <Block
                  noflex
                  black
                  center
                  middle
                  style={[
                    styles.user,
                    { zIndex: item?.users?.length, marginLeft: -5 },
                  ]}
                >
                  <Text title semibold white>
                    +{item?.users?.slice(2)?.length}
                  </Text>
                </Block>
              </Block>
            </Block>
          </Card>
        )}
      />
      {Boolean(eventOptions) && (
        <Modal
          id={eventOptions}
          isVisible={Boolean(eventOptions)}
          onSwipeComplete={() => setEventOptions(false)}
        >
          <Block
            noflex
            white
            paddingLeft={24}
            paddingRight={16}
            paddingBottom={24}
          >
            <TouchableOpacity activeOpacity={0.8}>
              <Block row center marginBottom={24}>
                <Block
                  noflex
                  padding
                  radius={8}
                  marginRight={16}
                  color={Utils.rgba(COLORS.gray, 0.2)}
                >
                  <Icon name="star" color={COLORS.black} size={14} />
                </Block>
                <Block>
                  <Text title semibold>
                    Mark as favorite
                  </Text>
                  <Text small gray>
                    Mark this user or user post as your favorite content
                  </Text>
                </Block>
              </Block>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Block row center marginBottom={24}>
                <Block
                  noflex
                  padding
                  radius={8}
                  marginRight={16}
                  color={Utils.rgba(COLORS.gray, 0.2)}
                >
                  <Icon name="closeCircle" color={COLORS.black} size={14} />
                </Block>
                <Block>
                  <Text title semibold>
                    Block this post
                  </Text>
                  <Text small gray>
                    Block this user not to receive any more notifications
                  </Text>
                </Block>
              </Block>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Block row center>
                <Block
                  noflex
                  padding
                  radius={8}
                  marginRight={16}
                  color={Utils.rgba(COLORS.gray, 0.2)}
                >
                  <Icon name="bin" color={COLORS.black} size={14} />
                </Block>
                <Block>
                  <Text title semibold>
                    Delete this post
                  </Text>
                  <Text small gray>
                    Delete this post from your feed
                  </Text>
                </Block>
              </Block>
            </TouchableOpacity>
          </Block>
        </Modal>
      )}
    </Block>
  );
};

export default Events;

const styles = StyleSheet.create({
  user: {
    borderRadius: 9,
    height: 28,
    width: 28,
  },
});
