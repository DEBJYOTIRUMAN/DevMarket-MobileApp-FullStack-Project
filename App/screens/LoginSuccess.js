import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import { Divider } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import bgImage from '../assets/images/loginsuccess.jpg';
export default function LoginSuccess({ navigation }) {
    const { token } = useSelector((state) => state.tokenReducer);
    const [logout, setLogout] = useState(false);
    const { items } = useSelector((state) => state.cartReducer.cart);
    const { user } = useSelector((state) => state.userReducer);
    const [checked, setChecked] = useState("male");
    const dispatch = useDispatch();
    // Post User Cart
    useEffect(() => {
        if (!logout) {
            return;
        }
        if (!token.access_token) {
            return;
        }
        fetch("https://devmarket-nknv.onrender.com/api/user-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.access_token}`,
            },
            body: JSON.stringify({
                productId: Object.keys(items),
                quantity: Object.values(items),
            }),
        })
            .then((res) => res.json())
            .then(() => {
                alert("Sign out succesfully!");
                setLogout(false);
                signOut();
            });
    }, [logout]);
    const signOut = () => {
        dispatch({
            type: "CLEAR_CART",
        });
        dispatch({
            type: "CLEAR_ADDRESS",
        });
        dispatch({
            type: "CLEAR_PAYMENT",
        });
        dispatch({
            type: "CLEAR_PRODUCT",
        });
        dispatch({
            type: "CLEAR_TOKEN",
        });
        dispatch({
            type: "CLEAR_TOTAL",
        });
        dispatch({
            type: "CLEAR_USER",
        });
        navigation.navigate("Home");
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={bgImage} style={{flex: 1}} resizeMode="cover">
            <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                        paddingVertical: 15
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ alignSelf: "center" }}
                    >
                        <Feather name="chevron-left" size={34}/>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: "#7842e5",
                            alignSelf: "center",
                        }}
                    >
                        My Profile
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Cart")}
                        style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        }}
                    >
                        <FontAwesome5
                            name="shopping-bag"
                            size={20}
                            style={{ padding: 5 }}
                        />
                    </TouchableOpacity>
                </View>   
                <Divider />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        height: 300,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 40,
                    }}
                >
                    <Image
                        source={
                            checked === "male"
                                ? require("../assets/icons/user.png")
                                : require("../assets/icons/user2.png")
                        }
                        style={{
                            width: 150,
                            height: 150,
                            borderColor: "#7842e5",
                            borderWidth: 8,
                            borderRadius: 20000,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginTop: 20,
                        }}
                    >
                        {user.name}
                    </Text>
                    <Text
                        style={{ fontSize: 17, marginTop: 8, color: "#7842e5" }}
                    >
                        Prime Member
                    </Text>
                    <Text style={{ fontSize: 14, marginTop: 8 }}>
                        {user.email}
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: 8 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 5,
                            }}
                        >
                            <RadioButton
                                value="male"
                                status={
                                    checked === "male" ? "checked" : "unchecked"
                                }
                                onPress={() => setChecked("male")}
                                color="#7842e5"
                            />
                            <Text
                                onPress={() => setChecked("male")}
                                style={{ fontSize: 15, alignSelf: "center" }}
                            >
                                Male
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 5,
                            }}
                        >
                            <RadioButton
                                value="female"
                                status={
                                    checked === "female"
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={() => setChecked("female")}
                                color="#7842e5"
                            />
                            <Text
                                onPress={() => setChecked("female")}
                                style={{ fontSize: 15, alignSelf: "center" }}
                            >
                                Female
                            </Text>
                        </View>
                    </View>
                </View>
                <Divider style={{ marginTop: 10 }} />
                <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                    <CartList title={"My Order"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Address", { successCall: true })
                    }
                >
                    <CartList title={"Delivery Address"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ContactUs")}
                >
                    <CartList title={"Contact Us"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
                <CartList title={"Privacy Policy"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Support")}>
                <CartList title={"Customer Support"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        Object.keys(items).length === 0
                            ? signOut()
                            : setLogout(true);
                    }}
                >
                    <CartList title={"Sign Out"} />
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
        </SafeAreaView>
    );
}
const CartList = ({ title }) => (
    <>
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20,
            }}
        >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
            <EvilIcons name="chevron-right" size={40} />
        </View>
        <Divider />
    </>
);
