import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { Divider } from "react-native-elements";
import bgImage from "../assets/images/ordercomplete.jpg";
import BottomTabs from "../components/home/BottomTabs";
const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  titleStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default function OrdersComplete({ navigation }) {
  const { product } = useSelector((state) => state.productReducer);
  const { items } = useSelector((state) => state.cartReducer.cart);
  const { token } = useSelector((state) => state.tokenReducer);
  const { total } = useSelector((state) => state.totalReducer);
  const sendData = product.map((pro) => {
    pro.qty = items[pro._id];
    pro.totalPrice = pro.price * items[pro._id];
    delete pro.category;
    delete pro.productType;
    delete pro.description;
    delete pro.bestseller;
    delete pro.createdAt;
    delete pro.productType;
    return pro;
  });

  const dispatch = useDispatch();
  const clearItem = () =>
    setTimeout(() => {
      navigation.navigate("Home");
      dispatch({
        type: "CLEAR_CART",
      });
      dispatch({
        type: "CLEAR_PRODUCT",
      });
      dispatch({
        type: "CLEAR_TOTAL",
      });
    }, 5000);
  //   Post Orders
  useEffect(() => {
    if (!token.access_token) {
      return;
    }
    fetch("https://devmarket-nknv.onrender.com/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(sendData),
    })
      .then((res) => res.json())
      .then(() => {});
  }, [token]);

  useEffect(() => {
    if (!token.access_token) {
      return;
    }
    fetch("https://devmarket-nknv.onrender.com/api/user-cart/delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        clearItem();
      });
  }, [token]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            margin: 15,
            alignItems: "center",
          }}
        >
          <LottieView
            style={{
              height: 100,
              alignSelf: "center",
              marginBottom: 30,
            }}
            source={require("../assets/animations/check-mark.json")}
            autoPlay
            speed={0.5}
            loop={false}
          />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Your order at Dev Market has been placed for {` ₹${total}`}
          </Text>
          {product.map((pro, index) => (
            <View key={index}>
              <View style={styles.menuItemStyle}>
                <ProInfo
                  name={pro.name}
                  qty={items[pro._id]}
                  price={pro.price * items[pro._id]}
                />
                <ProImage image={pro.image} />
              </View>
              <Divider
                width={0.5}
                orientation="vertical"
                style={{ marginHorizontal: 20 }}
              />
            </View>
          ))}
          <LottieView
            style={{ alignSelf: "center", height: 200 }}
            source={require("../assets/animations/delivery.json")}
            autoPlay
          />
        </ScrollView>
        <Divider width={1} />
        <BottomTabs navigation={navigation} activeTab="Account" />
      </ImageBackground>
    </SafeAreaView>
  );
}
const ProInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.name}</Text>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {`₹${props.price}`}
      </Text>
      <Text
        style={{
          fontSize: 14,
        }}
      >{`  (${props.qty} items)`}</Text>
    </View>
  </View>
);

const ProImage = (props) => (
  <View>
    <Image
      source={{ uri: props.image }}
      style={{
        width: 120,
        height: 120,
        borderRadius: 8,
      }}
    />
  </View>
);
