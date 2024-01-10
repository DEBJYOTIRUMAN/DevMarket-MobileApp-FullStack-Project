import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AddressInputField from "../formComponents/AddressInputField";
import AddressInputButton from "../formComponents/AddressInputButton";
import ErrorMessage from "../formComponents/ErrorMessage";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import bgImage from "../assets/images/address.jpg";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";

const validationSchema = Yup.object().shape({
  name: Yup.string().label("Name").required("Please enter your name."),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter your email address."),
  phone: Yup.string()
    .length(10)
    .label("Mobile Number")
    .required("Please enter your mobile number."),
  address: Yup.string()
    .label("Address")
    .required("Please enter your address.")
    .max(100, "Please ensure that address has less than 100 characters."),
  state: Yup.string()
    .label("State")
    .required("Please enter your state.")
    .max(50, "Please ensure that state has less than 50 characters."),
  pincode: Yup.string()
    .length(6)
    .label("Pincode")
    .required("Please enter your pincode."),
});

export default function Address({ navigation, route }) {
  const { user } = useSelector((state) => state.userReducer);
  const [checked, setChecked] = useState("home");
  const { address } = useSelector((state) => state.addressReducer);
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({});
  const { token } = useSelector((state) => state.tokenReducer);
  const dispatch = useDispatch();
  
  const controlSubmit = (values) => {
    setData(values);
    setSubmit(true);
  };

  // Post Address
  useEffect(() => {
    if (!submit) {
      return;
    }
    if (
      address.name == data.name &&
      address.email == data.email &&
      address.phone == data.phone &&
      address.address == data.address &&
      address.state == data.state &&
      address.pincode == data.pincode
    ) {
      if (!route.params) {
        navigation.navigate("Payment");
      } else {
        navigation.navigate("LoginSuccess");
      }
      return;
    }
    fetch("https://devmarket-nknv.onrender.com/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        state: data.state,
        pincode: data.pincode,
      }),
    })
      .then((res) => res.json())
      .then((getData) => {
        const userAddress = {
          name: getData.name,
          email: getData.email,
          phone: getData.phone,
          address: getData.address,
          state: getData.state,
          pincode: getData.pincode,
        };

        dispatch({
          type: "ADD_ADDRESS",
          payload: {
            userAddress,
          },
        });
        setSubmit(false);
        if (!route.params) {
          navigation.navigate("Payment");
        } else {
          navigation.navigate("LoginSuccess");
        }
      });
  }, [submit]);

  return Object.keys(user).length === 0 ? (
    <></>
  ) : (
    <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
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
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="keyboard-backspace"
                  size={32}
                  color={"black"}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 24,
                  textAlignVertical: "center",
                  fontWeight: "bold",
                  color: "#4b4f3e",
                }}
              >
                Delivery Address
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cart")}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#4b4f3e",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <FontAwesome5
                  name="shopping-bag"
                  size={20}
                  style={{ padding: 5 }}
                  color={"#ebeaef"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <Formik
                initialValues={{
                  name: `${address.name ? address.name : user.name}`,
                  email: `${address.email ? address.email : user.email}`,
                  phone: `${address.phone ? address.phone : ""}`,
                  address: `${address.address ? address.address : ""}`,
                  state: `${address.state ? address.state : ""}`,
                  pincode: `${address.pincode ? address.pincode : ""}`,
                }}
                onSubmit={(values) => {
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
                    <AddressInputField
                      name="name"
                      label="Name"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      placeholder="Enter your name"
                      returnKeyType="done"
                    />
                    <ErrorMessage errorValue={touched.name && errors.name} />

                    <AddressInputField
                      name="email"
                      label="Email Address"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder="Enter email"
                      keyboardType="email-address"
                      returnKeyType="done"
                      autoCapitalize="none"
                    />
                    <ErrorMessage errorValue={touched.email && errors.email} />

                    <AddressInputField
                      name="phone"
                      label="Mobile Number"
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      keyboardType="numeric"
                      placeholder="Enter Phone"
                      returnKeyType="done"
                      autoCapitalize="none"
                    />
                    <ErrorMessage errorValue={touched.phone && errors.phone} />

                    <AddressInputField
                      name="address"
                      label="Address"
                      value={values.address}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      placeholder="House No / Flat No / Floor"
                      returnKeyType="done"
                      autoCapitalize="none"
                    />
                    <ErrorMessage
                      errorValue={touched.address && errors.address}
                    />

                    <AddressInputField
                      name="state"
                      label="State"
                      value={values.state}
                      onChangeText={handleChange("state")}
                      onBlur={handleBlur("state")}
                      placeholder="Enter your State"
                      returnKeyType="done"
                      autoCapitalize="none"
                    />
                    <ErrorMessage errorValue={touched.state && errors.state} />

                    <AddressInputField
                      name="pincode"
                      label="Pincode"
                      value={values.pincode}
                      onChangeText={handleChange("pincode")}
                      onBlur={handleBlur("pincode")}
                      placeholder="Enter your Pincode"
                      returnKeyType="done"
                      autoCapitalize="none"
                      keyboardType="numeric"
                    />
                    <ErrorMessage
                      errorValue={touched.pincode && errors.pincode}
                    />
                    <View
                      style={{
                        borderRadius: 10,
                        marginBottom: 60,
                        marginTop: 20,
                        width: "100%",
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: "center",
                          marginBottom: 5,
                          color: "#4b4f3e",
                          fontWeight: "bold",
                        }}
                      >
                        Select an Address Type
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <RadioButton
                            value="home"
                            status={
                              checked === "home" ? "checked" : "unchecked"
                            }
                            onPress={() => setChecked("home")}
                            color="#57664d"
                          />
                          <Text
                            onPress={() => setChecked("home")}
                            style={{
                              fontSize: 16,
                              alignSelf: "center",
                              color: "#4b4f3e",
                              fontWeight: "bold",
                            }}
                          >
                            Home
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <RadioButton
                            value="work"
                            status={
                              checked === "work" ? "checked" : "unchecked"
                            }
                            onPress={() => setChecked("work")}
                            color="#57664d"
                          />
                          <Text
                            onPress={() => setChecked("work")}
                            style={{
                              fontSize: 16,
                              alignSelf: "center",
                              color: "#4b4f3e",
                              fontWeight: "bold",
                            }}
                          >
                            Work
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <RadioButton
                            value="others"
                            status={
                              checked === "others" ? "checked" : "unchecked"
                            }
                            onPress={() => setChecked("others")}
                            color="#57664d"
                          />
                          <Text
                            onPress={() => setChecked("others")}
                            style={{
                              fontSize: 16,
                              alignSelf: "center",
                              color: "#4b4f3e",
                              fontWeight: "bold",
                            }}
                          >
                            Others
                          </Text>
                        </View>
                      </View>
                    </View>

                    <AddressInputButton
                      onPress={handleSubmit}
                      disabled={!isValid}
                      buttonType="solid"
                      title="CONTINUE"
                      buttonColor="#57664d"
                    />
                  </>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
      <Divider width={1} />
      <BottomTabs navigation={navigation} activeTab="Account" />
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
    marginTop: 20,
  },

  avoidKeyboard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
});
