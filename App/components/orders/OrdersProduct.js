import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function OrdersProduct({ image, name, totalPrice, qty, createdAt, productId, navigation }) {
    
    const singlePage = () => {
        fetch(`https://devmarket-nknv.onrender.com/api/products/${productId}`)
            .then((res) => res.json())
            .then((menu) => {
                navigation.navigate("ProductDetail", menu);
            });  
    };
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginVertical: 10,
            }}
            onPress={() => {
                singlePage()
            }}
        >
            <View style={{ width: "25%" }}>
                <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 20 }}
                />
            </View>
            <View
                style={{
                    width: "75%",
                    height: 100,
                    justifyContent: "space-evenly",
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Text
                        style={{
                            textAlign: "justify",
                            width: "100%",
                            paddingHorizontal: 20,
                            fontWeight: 'bold',
                            fontSize: 15
                        }}
                    >
                        {name}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: "center"

                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                            style={{
                                paddingLeft: 20,
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            {`₹${totalPrice}`}
                        </Text>

                        <Text style={{ marginLeft: 6, fontSize: 14 }}>
                            {`(${qty} items)`}
                        </Text>
                    </View>
                    <View>
                        <Text>{createdAt.split("-").reverse().join("/")}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
