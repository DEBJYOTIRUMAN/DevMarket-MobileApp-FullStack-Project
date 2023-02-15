import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function Shops({ navigation, ...props }) {
  
  return (
    <>
      {props.shopData.map((shop, index) => (
        <TouchableOpacity key={index} activeOpacity={1} style={{ marginBottom: 30 }} onPress={() => navigation.navigate("ShopDetail", {
          name: shop.name,
          image: shop.image_url,
          price: shop.price,
          reviews: shop.reviews,
          rating: shop.rating,
          categories: shop.categories,
          shop_category: shop.shop_category,
        })}>
          <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          >
            <ShopImage image={shop.image_url} />
            <ShopInfo name={shop.name} rating={shop.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}
const ShopImage = (props) => (
  <>
    <Image
      source={{
        uri: props.image,
      }}
      style={{ width: "100%", height: 180 }}
    />
    <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
);

const ShopInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>
      <Text style={{ fontSize: 13, color: "gray" }}>30-45 • min</Text>
    </View>
    <View
      style={{
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
      }}
    >
      <Text>{props.rating}</Text>
    </View>
  </View>
);
