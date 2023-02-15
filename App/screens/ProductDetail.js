import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    Modal,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalCart from "../components/Utility/ModalCart";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import bgImage from '../assets/images/productdetails.jpg';
export default function ProductDetail({ route, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const product = route.params;
    return (
        <>
            <SafeAreaView style={{ backgroundColor: "#f2eff8", flex: 1 }}>
                <ImageBackground
                    source={bgImage}
                    style={{
                        flex: 1,
                    }}
                    resizeMode="cover"
                >
                    <ScrollView>
                        <ProductImage
                            image={product.image}
                            navigation={navigation}
                            bestseller={product.bestseller}
                        />
                        <Divider />
                        <ProductMain
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            brand={product.brand}
                        />
                    </ScrollView>
                    <View style={{ flexDirection: "row" }}>
                        <Pressable
                            onPress={() => navigation.navigate("Cart")}
                            style={({ pressed }) => [
                                {
                                    opacity: pressed ? 0.5 : 1.0,
                                    width: "50%",
                                    backgroundColor: "#F1F0FF",
                                    padding: 20,
                                    borderTopLeftRadius: 15,
                                    borderBottomLeftRadius: 15,
                                    borderWidth: 0.6,
                                    borderTopColor: "#d3d3d3",
                                    borderLeftColor: "#d3d3d3",
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "#ff69b4",
                                }}
                            >
                                MY BAG
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setModalVisible(true)}
                            style={({ pressed }) => [
                                {
                                    opacity: pressed ? 0.5 : 1.0,
                                    width: "50%",
                                    backgroundColor: "#7842e5",
                                    padding: 20,
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    color: "white",
                                    fontSize: 16,
                                }}
                            >
                                ADD TO BAG
                            </Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </SafeAreaView>
            {/* Modal Part Start Here */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <ModalCart
                    id={product._id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    visible={setModalVisible}
                />
            </Modal>
            {/* Modal Part End Here */}
        </>
    );
}
const ProductImage = ({ image, bestseller, navigation }) => (
    <>
        {bestseller ? (
            <View
                style={{
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    zIndex: 10,
                    borderRadius: 5,
                    top: 10,
                    left: 50,
                }}
            >
                <Text style={{ color: "white", padding: 5, fontSize: 11 }}>
                    Bestseller
                </Text>
            </View>
        ) : (
            <></>
        )}
        <ImageBackground
            source={{ uri: image }}
            style={{ width: "100%", height: 400 }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 20,
                    marginTop: 10,
                }}
            >
                <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ alignSelf: "center" }}
                    >
                        <Feather
                            name="chevron-left"
                            size={30}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Cart")}
                        style={{
                            width: 35,
                            height: 35,
                            backgroundColor: "#7842e5",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                        }}
                    >
                        <FontAwesome5
                            name="shopping-cart"
                            size={16}
                            color={"white"}
                        />
                    </TouchableOpacity>
            </View>
        </ImageBackground>
    </>
);
const ProductMain = ({ name, price, description, brand }) => (
    <View>
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20,
            }}
        >
            <Text style={{ width: "80%", fontSize: 18, fontWeight: "bold" }}>
                {name}
            </Text>
            <View>
                <Text
                    style={{
                        alignSelf: "center",
                        marginTop: 5,
                        color: "green",
                    }}
                >
                    10% off
                </Text>
                <Text
                    style={{ fontSize: 18, fontWeight: "bold" }}
                >{`₹ ${price}`}</Text>
            </View>
        </View>
        <Text style={{ fontSize: 16, paddingLeft: 20, marginBottom: 25 }}>
            <Text style={{ fontWeight: "bold" }}>Brand: </Text>
            {capitalize(brand)}
        </Text>
        <View
            style={{
                display: "flex",
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "gray",
                padding: 12,
                borderRadius: 15,
                height: 100,
                justifyContent: "space-evenly",
                marginTop: 20,
            }}
        >
            <Text>◾ 10% Instant Discount upto Rs.750 with Apple Pay.</Text>
            <Text>◾ Free One Day Delivery all over India.</Text>
        </View>
        <View>
            <Text
                style={{
                    paddingLeft: 30,
                    marginTop: 25,
                    paddingTop: 20,
                    marginBottom: 15,
                    fontSize: 15,
                }}
            >
                PRODUCT DETAILS
            </Text>
            <Text
                style={{
                    marginHorizontal: 50,
                    textAlign: "justify",
                    marginBottom: 20,
                }}
            >
                {description.replace(/\n/g, ".\n\n")}
            </Text>
        </View>
    </View>
);
const capitalize = (s) => {
    if (s === undefined) {
        return;
    }
    return s[0].toUpperCase() + s.slice(1);
};
