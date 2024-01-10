import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
export default function BottomTabs({ navigation, activeTab }) {
  const { user } = useSelector((state) => state.userReducer);
  const accountRedirect = () => {
    if (Object.keys(user).length === 0) {
      navigation.navigate("Signup");
      return;
    }
    navigation.navigate("LoginSuccess");
  };
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon icon="home" text="Home" activeTab={activeTab} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Browse")}>
        <Icon icon="list-ul" text="Bestseller" activeTab={activeTab} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <Icon icon="shopping-bag" text="Cart" activeTab={activeTab} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
        <Icon icon="receipt" text="Orders" activeTab={activeTab} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => accountRedirect()}>
        <Icon icon="user" text="Account" activeTab={activeTab} />
      </TouchableOpacity>
    </View>
  );
}
const Icon = (props) =>
  props.text === props.activeTab ? (
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
        color={"#475569"}
      />
      <Text style={{ color: "#475569" }}>{props.text}</Text>
    </View>
  ) : (
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{props.text}</Text>
    </View>
  );
