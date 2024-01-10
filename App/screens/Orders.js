import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import OrdersProduct from "../components/orders/OrdersProduct";
import bgImage from "../assets/images/orders.jpg";
import gift from "../assets/images/gift.png";
import BottomTabs from "../components/home/BottomTabs";
export default function Orders({ navigation }) {
    const { token } = useSelector((state) => state.tokenReducer);
    const [myOrders, setMyOrders] = useState([]);
    // Get Orders
    useEffect(() => {
        if (!token.access_token) {
            return;
        }
        fetch("https://devmarket-nknv.onrender.com/api/order", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setMyOrders(data);
            });
    }, [token]);

    return (
        <SafeAreaView
            style={{
                backgroundColor: "#ebeaef",
                flex: 1,
            }}
        >
            <ImageBackground
                source={bgImage}
                style={{ flex: 1 }}
                resizeMode="cover"
            >
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
                        <Feather
                            name="chevron-left"
                            size={32}
                            color={"#191f3f"}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 24,
                            color: "white",
                            alignSelf: "center",
                        }}
                    >
                        Orders
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
                <Divider style={{ marginHorizontal: 20 }} />
                {myOrders.length === 0 ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 240,
                                height: 240,
                                backgroundColor: "#3f4666",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 1000,
                            }}
                        >
                            <Image
                                source={gift}
                                style={{ width: 240, height: 240 }}
                            />
                        </View>
                        <View
                            style={{
                                paddingVertical: 80,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                                No Orders Yet
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginTop: 12,
                                    paddingHorizontal: 50,
                                    textAlign: "center",
                                    color: "grey",
                                }}
                            >
                                Looks like you haven't placed any orders.
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: 160,
                                height: 60,
                                backgroundColor: "#3f4666",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 30,
                            }}
                            onPress={() => navigation.navigate("Home")}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                }}
                            >
                                GO HOME
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={myOrders}
                        renderItem={({ item }) => (
                            <View>
                                <View style={{ alignItems: "center" }}>
                                    <OrdersProduct
                                        image={item.image}
                                        name={item.name}
                                        totalPrice={item.totalPrice}
                                        qty={item.qty}
                                        createdAt={
                                            item.createdAt.split("T")[0]
                                        }
                                        productId={item.productId}
                                        navigation={navigation}
                                    />
                                </View>
                                <Divider style={{ marginHorizontal: 20 }} />
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                )}
                <Divider width={1} />
                <BottomTabs navigation={navigation} activeTab="Orders" />
            </ImageBackground>
        </SafeAreaView>
    );
}
