import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import InputField from "../formComponents/InputField";
import InputButton from "../formComponents/InputButton";
import ErrorMessage from "../formComponents/ErrorMessage";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import bgImage from '../assets/images/signin.jpg';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .label("Email")
        .email("Enter a valid email")
        .required("Please enter your email address."),
    password: Yup.string()
        .label("Password")
        .required("Please enter your password.")
        .min(3, "Password must have at least 3 characters"),
});

export default function Signin({ navigation, route }) {
    const [Token, setToken] = useState({});
    const [ready, setReady] = useState(false);
    const [Submit, setSubmit] = useState(false);
    const [fetchCallData, setFetchCallData] = useState({});
    let flag = false;
    if (route.params) {
        flag = route.params.flag;
    }
    const controlSubmit = (values) => {
        setFetchCallData(values);
        setSubmit(true);
    };
    const dispatch = useDispatch();
    //Login
    useEffect(() => {
        if (!Submit) {
            return;
        }

        fetch("https://devmarket-nknv.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: fetchCallData.email,
                password: fetchCallData.password,
            }),
        })
            .then((res) => res.json())
            .then((tokenData) => {
                setToken(tokenData);

                dispatch({
                    type: "ADD_TOKEN",
                    payload: {
                        tokenData,
                    },
                });

                setSubmit(false);
                setReady(true);
            });
    }, [Submit]);

    //Who am I

    useEffect(() => {
        if (!ready) {
            return;
        }
        if (!Token.access_token) {
            alert("Username or password is wrong!");
            setReady(false);
            return;
        }

        fetch("https://devmarket-nknv.onrender.com/api/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Token.access_token}`,
            },
        })
            .then((res) => res.json())
            .then((userData) => {
                dispatch({
                    type: "ADD_USER",
                    payload: {
                        userData,
                    },
                });
                setReady(false);
            });
    }, [ready]);

    // Get User Cart
    useEffect(() => {
        if (!Token.access_token) {
            return;
        }
        fetch("https://devmarket-nknv.onrender.com/api/user-cart", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Token.access_token}`,
            },
        })
            .then((res) => res.json())
            .then(({ productId, quantity }) => {
                if (!productId) {
                    return;
                }
                if (!quantity) {
                    return;
                }
                for (let i = 0; i < productId.length; i++) {
                    let id = productId[i];
                    let qty = quantity[i];

                    dispatch({
                        type: "ADD_TO_CART",
                        payload: {
                            id,
                            qty,
                        },
                    });
                }
            });
    }, [Token]);

    // Address Get Request
    useEffect(() => {
        if (!Token.access_token) {
            return;
        }

        fetch("https://devmarket-nknv.onrender.com/api/address", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Token.access_token}`,
            },
        })
            .then((res) => res.json())
            .then((userAddress) => {
                if (!userAddress) {
                    return;
                }
                dispatch({
                    type: "ADD_ADDRESS",
                    payload: {
                        userAddress,
                    },
                });
            });
    }, [Token]);

    // Get Saved Payment
    useEffect(() => {
        if (!Token.access_token) {
            return;
        }
        fetch("https://devmarket-nknv.onrender.com/api/payment", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Token.access_token}`,
            },
        })
            .then((res) => res.json())
            .then((userPayment) => {
                if (!userPayment) {
                    return;
                }
                dispatch({
                    type: "ADD_PAYMENT",
                    payload: {
                        userPayment,
                    },
                });
            });
        if (!flag) {
            navigation.navigate("Home");
        } else {
            navigation.navigate("Cart");
        }
    }, [Token]);

    return (
        <ImageBackground source={bgImage} style={{flex: 1}} resizeMode="cover">
        <KeyboardAvoidingView
            style={styles.avoidKeyboard}
            behavior="padding"
            enabled
            keyboardVerticalOffset={-1000}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <View
                        style={{
                            marginTop: 150,
                            alignSelf: "flex-start",
                            paddingHorizontal: 30,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 36,
                                fontWeight: "bold",
                                color: "#533263",
                            }}
                            adjustsFontSizeToFit
                        >
                            Login
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#533263",
                                marginVertical: 10
                            }}
                        >Please sign in to continue.</Text>
                    </View>
                    <View style={styles.form}>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            onSubmit={(values) => {
                                // Use API to handle validated data
                                controlSubmit(values);
                            }}
                            validationSchema={validationSchema}
                        >
                            {({
                                handleChange,
                                values,
                                handleSubmit,
                                errors,
                                isValid,
                                touched,
                                handleBlur,
                            }) => (
                                <>
                                    <InputField
                                        name="email"
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        placeholder="Email"
                                        keyboardType="email-address"
                                        returnKeyType="done"
                                        autoCapitalize="none"
                                        iconName="mail"
                                        iconColor="grey"
                                    />
                                    <ErrorMessage
                                        errorValue={
                                            touched.email && errors.email
                                        }
                                    />

                                    <InputField
                                        name="password"
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        placeholder="Password"
                                        returnKeyType="done"
                                        autoCapitalize="none"
                                        secureTextEntry={true}
                                        iconName="lock"
                                        iconColor="grey"
                                    />
                                    <ErrorMessage
                                        errorValue={
                                            touched.password && errors.password
                                        }
                                    />

                                    <InputButton
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                        buttonType="solid"
                                        title="LOGIN"
                                        buttonColor="#533263"
                                    />
                                </>
                            )}
                        </Formik>
                    </View>
                    <StatusBar style="auto" />
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 160,
                            marginBottom: 30
                        }}
                    >
                        <Text style={{ fontSize: 17, color: '#7842e5' }}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Signup", { flag: flag })
                            }
                            style={{ marginLeft: 4 }}
                        >
                            <Text
                                style={{
                                    color: "#533263",
                                    fontSize: 17,
                                    fontWeight: "bold",
                                }}
                            >
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        color: "#533263",
        fontWeight: "bold",
    },
    form: {
        width: "90%",
        marginTop: 55,
    },

    avoidKeyboard: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
    },
});
