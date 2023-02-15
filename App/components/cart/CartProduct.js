import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch } from "react-redux";
export default function CartProduct({
    image,
    name,
    sumPrice,
    id,
    itemQty,
    index,
    description,
    brand,
    price,
    navigation,
    togglePriceFetched,
    bestseller
}) {
    const dispatch = useDispatch();
    const deleteCart = () => {
        togglePriceFetched(true);
        dispatch({
            type: "DELETE_TO_CART",
            payload: {
                id,
            },
        });
        dispatch({
            type: "DELETE_TO_PRODUCT",
            payload: {
                index,
            },
        });
    };
    const increment = () => {
        togglePriceFetched(true);
        if (itemQty >= 10) {
            return;
        }
        itemQty += 1;
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id,
                itemQty,
            },
        });
    };

    const decrement = () => {
        togglePriceFetched(true);
        if (itemQty <= 1) {
            return;
        }
        itemQty -= 1;
        dispatch({
            type: "SUBTRACT_TO_CART",
            payload: {
                id,
                itemQty,
            },
        });
    };
    const singlePage = () => {
        navigation.navigate("ProductDetail", {
            _id: id,
            name: name,
            price: price,
            description: description,
            brand: brand,
            image: image,
            bestseller: bestseller,
        });
    };
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                    marginTop: 6,
                }}
            >
                <TouchableOpacity
                    style={{ width: "25%" }}
                    onPress={() => singlePage()}
                >
                    <Image
                        source={{ uri: image }}
                        style={{ width: 100, height: 100, borderRadius: 20 }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        width: "75%",
                        height: 100,
                        justifyContent: "space-evenly",
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => singlePage()}
                            style={{ width: "90%", paddingHorizontal: 20 }}
                        >
                            <Text
                                style={{
                                    textAlign: "justify"
                                }}
                            >
                                {name}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteCart()}>
                            <MaterialCommunityIcons
                                name="delete-circle-outline"
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                paddingHorizontal: 20,
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            {`₹${sumPrice}`}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => decrement()} style={{width: 26, height: 26, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderWidth: 1, borderColor: 'black'}}>
                                <Entypo name="minus" size={15} color={"black"}/>
                            </TouchableOpacity>
                            <Text
                                style={{ marginHorizontal: 10, fontSize: 15, alignSelf: 'center', fontWeight: 'bold' }}
                            >
                                {itemQty}
                            </Text>
                            <TouchableOpacity onPress={() => increment()} style={{width: 26, height: 26, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 100}}>
                                <Entypo name="plus" size={15} color={"white"}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}
