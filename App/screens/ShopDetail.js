import React, { useState, useEffect } from "react";
import { View, ImageBackground } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/shopDetails/About";
import MenuItems from "../components/shopDetails/MenuItems";
import bgImage from "../assets/images/shopdetails.jpg";
export default function ShopDetail({ route, navigation }) {
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        fetch(
            `https://devmarket-nknv.onrender.com/api/products/specific/category/${route.params.shop_category}`
        )
            .then((response) => response.json())
            .then((menu) => {
                setMenus(menu);
            });
    }, []);
    return (
        <ImageBackground
            source={bgImage}
            style={{
                flex: 1,
            }}
            resizeMode="cover"
        >
            <View style={{ flex: 1 }}>
                <About route={route} navigation={navigation} />
                <Divider width={1.8} style={{ marginVertical: 20 }} />
                <MenuItems menus={menus} navigation={navigation} />
            </View>
        </ImageBackground>
    );
}
