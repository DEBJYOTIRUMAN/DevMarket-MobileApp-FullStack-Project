import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";

export default function CartSubtotal({ total }) {
  const [text, onChangeText] = useState("");
  const [promoCall, setPromoCall] = useState(false);
  const shippingPrice = 50;
  const styles = StyleSheet.create({
    input: {
      height: 60,
      margin: 25,
      borderRadius: 10,
      backgroundColor: "white",
      padding: 20,
      fontSize: 18,
    },
  });
  const dispatch = useDispatch();
  const bagTotal = () => {
    const newTotal = total + shippingPrice;
    dispatch({
      type: "ADD_TOTAL",
      payload: {
        newTotal: Math.round(newTotal),
      },
    });
    return Math.round(newTotal);
  };
  const codeDiscount = () => {
    let newTotal = total + shippingPrice;
    if (text.toLowerCase() == "free50") {
      newTotal = newTotal - 50;
    }
    if (text.toLowerCase() == "roman10") {
      newTotal = newTotal - newTotal * 0.1;
    }
    if (text.toLowerCase() == "roman20") {
      newTotal = newTotal - newTotal * 0.2;
    }
    dispatch({
      type: "ADD_TOTAL",
      payload: {
        newTotal: Math.round(newTotal),
      },
    });
    return Math.round(newTotal);
  };
  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Promo Code"
          value={text}
          onChangeText={onChangeText}
        />

        <TouchableOpacity
          style={{ position: "absolute", top: 35, right: 45 }}
          onPress={() => setPromoCall(true)}
        >
          <View
            style={{
              width: 90,
              height: 40,
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "white",
                marginBottom: 4,
                paddingHorizontal: 10,
              }}
            >
              {!promoCall ? "Apply" : "Applied"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 25,
          height: 50,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "white",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Subtotal</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{`₹ ${total}`}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 25,
          height: 50,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "white",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Shipping</Text>
        <Text
          style={{ fontSize: 20, fontWeight: "bold" }}
        >{`₹ ${shippingPrice}`}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 25,
          height: 50,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Bag Total</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {!promoCall ? `₹ ${bagTotal()}` : `₹ ${codeDiscount()}`}
        </Text>
      </View>
    </>
  );
}
