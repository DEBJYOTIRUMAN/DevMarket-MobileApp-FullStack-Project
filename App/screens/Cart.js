import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../components/cart/CartProduct";
import CartSubtotal from "../components/cart/CartSubtotal";
import Feather from "react-native-vector-icons/Feather";
import bag1 from "../assets/images/bag1.png";
import bgImage from "../assets/images/cart.jpg";
export default function Cart({ navigation }) {
    const { items } = useSelector((state) => state.cartReducer.cart);
    const { user } = useSelector((state) => state.userReducer);
    const [products, setProducts] = useState([]);
    const [priceFetched, togglePriceFetched] = useState(false);
    let total = 0;
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(items).length === 0) {
            return;
        }

        if (priceFetched) {
            return;
        }
        
        fetch("https://devmarket-nknv.onrender.com/api/products/cart-items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: Object.keys(items) }),
        })
            .then((res) => res.json())
            .then((products) => {
                dispatch({
                    type: "ADD_PRODUCT",
                    payload: {
                        products,
                    },
                });
                setProducts(products);
            });
    }, [items, priceFetched]);

    const getQty = (productId) => {
        return items[productId];
    };

    const getSum = (price, productId) => {
        const sum = price * getQty(productId);
        total += sum;
        return sum;
    };
    const checkoutNext = () => {
        if (Object.keys(user).length === 0) {
            navigation.navigate("Signin", { flag: true });
            return;
        }
        navigation.navigate("Address");
    };
    return (
        <SafeAreaView style={{ backgroundColor: "#ebeaef", flex: 1 }}>
            {Object.keys(items).length === 0 || products.length === 0 ? (
                <ImageBackground
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    resizeMode="cover"
                    source={bgImage}
                >
                    <View
                        style={{
                            width: 240,
                            height: 240,
                            backgroundColor: "#aca08d",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 1000,
                        }}
                    >
                        <Image
                            source={bag1}
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
                            Your Bag is Empty
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
                            Looks like you haven't made your choice yet.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: 160,
                            height: 60,
                            backgroundColor: "#57664d",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 30,
                        }}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text
                            style={{
                                color: "#e3e2e0",
                                fontSize: 20,
                                fontWeight: "bold",
                            }}
                        >
                            GO HOME
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            ) : (
                <ImageBackground
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    resizeMode="cover"
                    source={bgImage}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                marginTop: 20,
                                marginBottom: 6,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ alignSelf: "center" }}
                            >
                                <Feather name="chevron-left" size={34} />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 17,
                                    alignSelf: "center",
                                }}
                            >
                                Shopping Bag
                            </Text>
                            <View
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
                                    name="shopping-cart"
                                    size={20}
                                    style={{ padding: 5 }}
                                />
                            </View>
                        </View>
                        {products.map((product, index) => {
                            return (
                                <View key={index}>
                                    <CartProduct
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        sumPrice={getSum(
                                            product.price,
                                            product._id
                                        )}
                                        id={product._id}
                                        itemQty={getQty(product._id)}
                                        index={index}
                                        description={product.description}
                                        brand={product.brand}
                                        navigation={navigation}
                                        togglePriceFetched={togglePriceFetched}
                                        bestseller={product.bestseller}
                                    />
                                </View>
                            );
                        })}
                        <CartSubtotal total={total} />
                        </ScrollView>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "black",
                                    marginHorizontal: 30,
                                    marginVertical: 50,
                                    height: 60,
                                    width: "90%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 15,
                                    borderRadius: 30,

                                }}
                                onPress={() => checkoutNext()}
                            >
                                <Text
                                    style={{
                                        fontSize: 17,
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Proceed To Checkout
                                </Text>
                            </TouchableOpacity>
                    
                </ImageBackground>
            )}
        </SafeAreaView>
    );
}
