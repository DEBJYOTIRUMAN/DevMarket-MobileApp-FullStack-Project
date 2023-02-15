import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
export default function BottomTabs({ navigation }) {
    const { user } = useSelector((state) => state.userReducer);
    const accountRedirect = () => {
        if (Object.keys(user).length === 0) {
          navigation.navigate("Signup");
          return;
        };
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
            <HomeIcon icon="home" text="Home" />
            <TouchableOpacity onPress={() => navigation.navigate("Browse")}>
            <Icon icon="list-ul" text="Bestseller" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <Icon icon="shopping-bag" text="Cart" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                <Icon icon="receipt" text="Orders" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => accountRedirect()}>
                <Icon icon="user" text="Account" />
            </TouchableOpacity>
        </View>
    );
}
const HomeIcon = (props) => (
    <View>
        <FontAwesome5
            name={props.icon}
            size={25}
            style={{
                marginBottom: 3,
                alignSelf: "center",
            }}
            color={"gray"}
        />
        <Text style={{color: 'gray'}}>{props.text}</Text>
    </View>
)

const Icon = (props) => (
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
