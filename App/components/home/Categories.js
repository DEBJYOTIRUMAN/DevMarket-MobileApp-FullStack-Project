import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
const items = [
    {
        image: require("../../assets/images/mobiles-icon.png"),
        text: "Mobiles",
        titleImage: require("../../assets/images/mobiles.jpg"),
    },
    {
        image: require("../../assets/images/electronics-icon.png"),
        text: "Electronics",
        titleImage: require("../../assets/images/electronics.jpg"),
    },
    {
        image: require("../../assets/images/laptops-icon.png"),
        text: "Laptops",
        titleImage: require("../../assets/images/laptops.jpg"),
    },
    {
        image: require("../../assets/images/beauty-icon.png"),
        text: "Beauty",
        titleImage: require("../../assets/images/beauty.jpg"),
    },
    {
        image: require("../../assets/images/softwares-icon.png"),
        text: "Softwares",
        titleImage: require("../../assets/images/softwares.jpg"),
    },
];
export default function Categories({navigation}) {
    return (
        <View
            style={{
                marginTop: 5,
                backgroundColor: "#fff",
                paddingVertical: 10,
                paddingLeft: 20,
            }}
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{ alignItems: "center", marginRight: 30 }}
                        onPress={() => navigation.navigate("BrowseAllProducts", {
                          text: item.text, 
                          titleImage: item.titleImage,
                        })}
                    >
                        <Image
                            source={item.image}
                            style={{
                                width: 50,
                                height: 40,
                                resizeMode: "contain",
                            }}
                        />
                        <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                            {item.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
