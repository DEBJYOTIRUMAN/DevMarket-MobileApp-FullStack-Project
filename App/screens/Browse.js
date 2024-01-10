import React from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import bgImage from "../assets/images/support.jpg";
import BottomTabs from "../components/home/BottomTabs";
const items = [
  {
    text: "Mobiles",
    image: require("../assets/images/mobiles.jpg"),
  },
  {
    text: "Electronics",
    image: require("../assets/images/electronics.jpg"),
  },
  {
    text: "Laptops",
    image: require("../assets/images/laptops.jpg"),
  },
  {
    text: "Beauty",
    image: require("../assets/images/beauty.jpg"),
  },
  {
    text: "Softwares",
    image: require("../assets/images/softwares.jpg"),
  },
];
export default function Browse({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ alignSelf: "center" }}
          >
            <Feather name="chevron-left" size={32} color={"black"} />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              color: "black",
              alignSelf: "center",
            }}
          >
            Bestseller
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={{
              width: 35,
              height: 35,
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <FontAwesome5
              name="shopping-cart"
              size={15}
              style={{ padding: 5 }}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
        <Divider />
        <ScrollView>
          {items.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => navigation.navigate("BestsellerProducts", item)}
              >
                <ImageBackground
                  source={item.image}
                  style={{ width: "100%", height: 160 }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginTop: 25,
                      marginLeft: 12,
                    }}
                  >
                    {item.text}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <Divider width={1.8} color="white" />
            </View>
          ))}
        </ScrollView>
        <Divider width={1} />
        <BottomTabs navigation={navigation} activeTab="Bestseller" />
      </ImageBackground>
    </SafeAreaView>
  );
}
