import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import bgImage from "../../assets/images/search.jpg";
import { Divider } from "react-native-elements";
import BottomTabs from "./BottomTabs";

export default function SearchBarDetails({ query, searchData, navigation }) {
  return query === "" || searchData.length === 0 ? (
    <></>
  ) : (
    <ImageBackground
      source={bgImage}
      style={{ height: "100%" }}
      resizeMode="cover"
    >
      <View
        style={{
          paddingHorizontal: 8,
          width: "90%",
          alignSelf: "center",
          height: "75%",
        }}
      >
        <FlatList
          data={searchData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                height: 80,
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "white",
                flexDirection: "row",
              }}
              onPress={() => navigation.navigate("ProductDetail", item)}
            >
              <Text style={{ width: "90%", fontSize: 16, fontWeight: "700" }}>
                {item.name}
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: "white",
                  justifyContent: "center",
                  borderRadius: 1000,
                }}
              >
                <EvilIcons name="chevron-right" size={35} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Divider width={1} />
      <BottomTabs navigation={navigation} activeTab="Home" />
    </ImageBackground>
  );
}
