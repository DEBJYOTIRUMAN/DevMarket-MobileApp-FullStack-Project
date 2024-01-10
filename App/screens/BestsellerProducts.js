import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import MenuItems from "../components/shopDetails/MenuItems";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import bgImage from "../assets/images/bestseller.jpg";
import BottomTabs from "../components/home/BottomTabs";
export default function BestsellerProducts({ route, navigation }) {
    let title = route.params.text;
    let image = route.params.image;
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        fetch(
            `https://devmarket-nknv.onrender.com/api/products/bestseller/${title.toLowerCase()}`
        )
            .then((response) => response.json())
            .then((data) => {
                setMenus(data);
            });
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={image}
                style={{ width: "100%", height: 180 }}
            >
                <TouchableOpacity
                    style={{
                        width: 30,
                        height: 30,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        position: "absolute",
                        right: 25,
                        top: 25,
                    }}
                    onPress={() => navigation.navigate("Cart")}
                >
                    <FontAwesome5 name="shopping-cart" size={16} />
                </TouchableOpacity>
            </ImageBackground>
            <ImageBackground
                source={bgImage}
                style={{ flex: 1 }}
                resizeMode="cover"
            >
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                }}
            >
                <Text
                    style={{ fontSize: 25, fontWeight: "bold" }}
                >{`Bestsellers in ${title}`}</Text>
            </View>
            <Divider width={1.8} style={{ marginVertical: 20 }} />
            <MenuItems menus={menus} navigation={navigation} />
            <Divider width={1} />
            <BottomTabs navigation={navigation} activeTab="Bestseller" />
            </ImageBackground>
        </View>
    );
}
