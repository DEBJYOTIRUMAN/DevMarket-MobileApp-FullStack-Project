import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
import bgImage from '../../assets/images/productdetails.jpg';
export default function ModalCart({id, name, image, price, visible}) {
    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.7)",     
        },

        modalCheckoutContainer: {
            padding: 16,
            height: 540,
            borderWidth: 1,
            borderRadius: 40,
        },
    });
    const { items } = useSelector((state) => state.cartReducer.cart);
    const [qty, setQty] = useState(items[id]);
    const dispatch = useDispatch();
    const increment = () => {
        if(qty>=10){
            return;
        }
        setQty(qty+1);
        
    };
   
    const decrement = () => {
        if(qty<=1){
            return;
        }
        setQty(qty-1);
        
    };
    const totalSum = () => {
        const sum = price * qty;
        return `₹ ${sum}`;
      };
    
    const addToCart = () => {
        const isModal = true;
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id,
                qty,
                isModal,
            },
          });
    }
    return (
        <View style={styles.modalContainer}>
            <ImageBackground source={bgImage} style={styles.modalCheckoutContainer}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: "#999",
                    }}
                >
                    <View style={{ width: "50%" }}>
                        <Image
                            source={{ uri: image }}
                            style={{
                                width: 140,
                                height: 140,
                                borderRadius: 20,
                            }}
                        />
                    </View>
                    <View style={{ width: "50%", marginVertical: 20 }}>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                textAlign: "justify",
                            }}
                        >
                            {name}
                        </Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Text
                                style={{ fontSize: 18, fontWeight: "bold" }}
                            >{`₹ ${price}`}</Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "green",
                                    marginLeft: 10,
                                    fontWeight: "bold",
                                    marginTop: 5,
                                }}
                            >
                                10% off
                            </Text>
                        </View>
                    </View>
                </View>
                <Text
                    style={{
                        fontSize: 14,
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: 50,
                    }}
                >
                    SELECT QTY
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 30,
                    }}
                >
                    <TouchableOpacity onPress={() => decrement()} style={{width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderWidth: 0.5, borderRadius: 100}}>
                        <Entypo name="minus" size={20} color={"grey"}/>
                    </TouchableOpacity>
                    <Text style={{ marginHorizontal: 40, fontSize: 17, fontWeight: 'bold', alignSelf: 'center' }}>
                        {qty ? qty : setQty(1)}
                    </Text>
                    <TouchableOpacity onPress={() => increment()} style={{width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderWidth: 0.5, borderRadius: 100}}>
                        <Entypo name="plus" size={20} color={"#ff69b4"}/>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 100,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            marginTop: 20,
                            backgroundColor: "#ff69b4",
                            alignItems: "center",
                            padding: 15,
                            borderRadius: 30,
                            width: 300,
                            position: "relative",
                        }}
                        onPress={() => {
                            visible(false);
                            addToCart();
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            ADD TO CART
                        </Text>
                        <Text
                            style={{
                                position: "absolute",
                                right: 20,
                                color: "white",
                                fontSize: 15,
                                top: 16,
                            }}
                        >
                            {totalSum()}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}
