import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PaymentInputField from "../formComponents/PaymentInputField";
import PaymentInputButton from "../formComponents/PaymentInputButton";
import ErrorMessage from "../formComponents/ErrorMessage";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import bgImage from "../assets/images/payment.jpg";
import mastercard from "../assets/icons/mastercard.png";
import visa from "../assets/icons/visa.png";
import paypal from "../assets/icons/paypal.png";
import apple from "../assets/icons/applepay.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Divider } from "react-native-elements";
import LottieView from "lottie-react-native";

const validationSchema = Yup.object().shape({
  number: Yup.string()
    .length(16)
    .label("Card Number")
    .required("Please enter your Card Number."),
  validity: Yup.string()
    .length(7)
    .label("Validity")
    .required("Please enter your Card Validity."),
  cvv: Yup.string().length(3).label("CVV").required("Please enter your CVV."),
  name: Yup.string()
    .label("Card Name")
    .required("Please enter your Card Name."),
});

export default function Payment({ navigation }) {
  const { total } = useSelector((state) => state.totalReducer);
  const { token } = useSelector((state) => state.tokenReducer);
  const { payment } = useSelector((state) => state.paymentReducer);
  const [Submit, setSubmit] = useState(false);
  const [data, setData] = useState({});
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState("mastercard");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const controlSubmit = (values) => {
    setSubmit(true);
    setData(values);
  };
  // Fresh Token Generate
  useEffect(() => {
    if (!Submit) {
      return;
    }

    if (!token.refresh_token) {
      return;
    }
    fetch("https://devmarket-nknv.onrender.com/api/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: token.refresh_token,
      }),
    })
      .then((res) => res.json())
      .then((tokenData) => {
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

  // Save Payment
  useEffect(() => {

    if (!ready) {
      return;
    }

    if (!token.access_token) {
      return;
    }
    setLoading(true);

    fetch("https://devmarket-nknv.onrender.com/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        number: data.number,
        validity: data.validity,
        cvv: data.cvv,
        name: data.name,
      }),
    })
      .then((res) => res.json())
      .then((getData) => {
        const userPayment = {
          number: getData.number,
          validity: getData.validity,
          cvv: getData.cvv,
          name: getData.name,
        };
        dispatch({
          type: "ADD_PAYMENT",
          payload: {
            userPayment,
          },
        });
        setReady(false);
      });
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("OrdersComplete");
    }, 2000);
  }, [ready]);

  return (
    <SafeAreaView style={{ backgroundColor: "#f6f7f7", flex: 1 }}>
      <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
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
              color={"#FB6B90"}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              textAlignVertical: "center",
              fontWeight: "bold",
              color: "#384140",
            }}
          >
            Payment
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
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
              name="shopping-bag"
              size={20}
              style={{ padding: 5 }}
              color={"#FB4570"}
            />
          </TouchableOpacity>
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 25,
            }}
          >
            {/* Credit Card */}
            <TouchableOpacity
              style={{
                width: 150,
                height: 55,
                borderRadius: 22,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
                backgroundColor: checked == "mastercard" ? "#b8c8c5" : "white",
              }}
              onPress={() => setChecked("mastercard")}
            >
              <Image source={mastercard} style={{ width: 32, height: 32 }} />
              <View
                style={{
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  Credit Card
                </Text>
              </View>
            </TouchableOpacity>

            {/* Debit Card */}

            <TouchableOpacity
              style={{
                width: 150,
                height: 55,
                borderRadius: 22,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
                backgroundColor: checked == "visa" ? "#b8c8c5" : "white",
              }}
              onPress={() => setChecked("visa")}
            >
              <Image source={visa} style={{ width: 32, height: 32 }} />
              <View
                style={{
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  Debit Card
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 25,
            }}
          >
            {/* PayPal */}
            <TouchableOpacity
              style={{
                width: 150,
                height: 55,
                borderRadius: 22,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
                backgroundColor: checked == "paypal" ? "#b8c8c5" : "white",
              }}
              onPress={() => setChecked("paypal")}
            >
              <Image source={paypal} style={{ width: 32, height: 32 }} />
              <View
                style={{
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  PayPal Card
                </Text>
              </View>
            </TouchableOpacity>
            {/* Apple Card */}
            <TouchableOpacity
              style={{
                width: 150,
                height: 55,
                borderRadius: 22,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
                backgroundColor: checked == "applepay" ? "#b8c8c5" : "white",
              }}
              onPress={() => setChecked("applepay")}
            >
              <Image source={apple} style={{ width: 32, height: 32 }} />
              <View
                style={{
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  Apple Card
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.form}>
              <Formik
                initialValues={{
                  number: `${payment.number ? payment.number : ""}`,
                  validity: `${payment.validity ? payment.validity : ""}`,
                  cvv: `${payment.cvv ? payment.cvv : ""}`,
                  name: `${payment.name ? payment.name : ""}`,
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
                    <PaymentInputField
                      name="number"
                      label="Card Number"
                      value={values.number}
                      onChangeText={handleChange("number")}
                      onBlur={handleBlur("number")}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      returnKeyType="done"
                      keyboardType="numeric"
                      logoName={checked}
                    />
                    <ErrorMessage
                      errorValue={touched.number && errors.number}
                    />
                    <PaymentInputField
                      name="validity"
                      label="Validity"
                      value={values.validity}
                      onChangeText={handleChange("validity")}
                      onBlur={handleBlur("validity")}
                      placeholder="12/2030"
                      returnKeyType="done"
                      keyboardType="phone-pad"
                    />
                    <ErrorMessage
                      errorValue={touched.validity && errors.validity}
                    />

                    <PaymentInputField
                      name="cvv"
                      label="CVV"
                      value={values.cvv}
                      onChangeText={handleChange("cvv")}
                      onBlur={handleBlur("cvv")}
                      placeholder="123"
                      returnKeyType="done"
                      keyboardType="numeric"
                    />
                    <ErrorMessage errorValue={touched.cvv && errors.cvv} />

                    <PaymentInputField
                      name="name"
                      label="Card Name"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      placeholder="Ruman Das"
                      returnKeyType="done"
                    />
                    <ErrorMessage errorValue={touched.name && errors.name} />

                    <View>
                      <PaymentInputButton
                        onPress={handleSubmit}
                        disabled={!isValid}
                        buttonType="solid"
                        title="PAY NOW"
                        buttonColor="#FB6B90"
                      />
                      <Text
                        style={{
                          position: "absolute",
                          right: 30,
                          color: "white",
                          fontSize: 16,
                          top: 14,
                        }}
                      >
                        {`₹ ${total}`}
                      </Text>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
        {loading ? (
          <View
            style={{
              backgroundColor: "black",
              position: "absolute",
              opacity: 0.6,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <LottieView
              style={{ height: 200 }}
              source={require("../assets/animations/scanner.json")}
              autoPlay
              speed={3}
            />
          </View>
        ) : (
          <></>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "90%",
    marginTop: 40,
  },
});
