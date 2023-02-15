import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function About({route, navigation}) {
    const { name, image, price, reviews, rating, categories } = route.params;

    const formattedCategories = categories.map((cat) => cat).join(" • ");

    const description = `${formattedCategories} ${
        price ? " • " + price : ""
    } • 🎫 • ${rating} ⭐ (${reviews}+)`;

    return (
        <View>
            <ShopImage image={image} navigation={navigation} />
            <ShopName name={name} />
            <ShopDescription description={description} />
        </View>
    );
}

const ShopImage = ({image, navigation}) => (
    <ImageBackground
        source={{ uri: image }}
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
                position: 'absolute',
                right: 25,
                top: 25
            }}
            onPress={() => navigation.navigate("Cart")}
        >
            <FontAwesome5
                name="shopping-cart"
                size={16}
            />
        </TouchableOpacity>
    </ImageBackground>
);
const ShopName = ({name}) => (
    <Text
        style={{
            fontSize: 29,
            fontWeight: "600",
            marginTop: 10,
            marginHorizontal: 15,
        }}
    >
        {name}
    </Text>
);
const ShopDescription = ({description}) => (
    <Text
        style={{
            marginTop: 10,
            marginHorizontal: 15,
            fontWeight: "400",
            fontSize: 15.5,
        }}
    >
        {description}
    </Text>
);
