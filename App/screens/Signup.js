import React, { useState, useEffect } from "react";
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
import bgImage from "../assets/images/signup.jpg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BottomTabs from "../components/home/BottomTabs";
import { Divider } from "react-native-elements";

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .label("Fullname")
    .required("Please enter your name.")
    .min(3, "Name must have at least 3 characters.")
    .max(30, "Name must be less than or equal to 30 characters."),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter your email address."),
  password: Yup.string()
    .label("Password")
    .required("Please enter your password.")
    .min(3, "Password must have at least 3 characters."),
  repeat_password: Yup.string()
    .label("Repeat Password")
    .required("Please make sure your password match.")
    .min(3, "Password must have at least 3 characters."),
});

export default function Signup({ navigation, route }) {
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
  // Register
  useEffect(() => {
    if (!Submit) {
      return;
    }

    fetch("https://devmarket-nknv.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fetchCallData.fullname,
        email: fetchCallData.email,
        password: fetchCallData.password,
        repeat_password: fetchCallData.repeat_password,
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
      alert(
        "This email address has been taken by another account or password and repeat password does not match."
      );
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

    if (!flag) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Cart");
    }
  }, [ready]);

  return (
    <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
      <KeyboardAvoidingView
        style={styles.avoidKeyboard}
        behavior="padding"
        enabled
        keyboardVerticalOffset={-1000}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView style={styles.container}>
            <TouchableOpacity
              style={{
                alignSelf: "flex-start",
                marginTop: 30,
                paddingHorizontal: 30,
              }}
              onPress={() => navigation.navigate("Home")}
            >
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={36}
                color={"grey"}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 36,
                fontWeight: "bold",
                marginTop: 40,
                alignSelf: "flex-start",
                paddingHorizontal: 30,
                color: "#533263",
              }}
              adjustsFontSizeToFit
            >
              Create Account
            </Text>
            <View style={styles.form}>
              <Formik
                initialValues={{
                  fullname: "",
                  email: "",
                  password: "",
                  repeat_password: "",
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
                      name="fullname"
                      value={values.fullname}
                      onChangeText={handleChange("fullname")}
                      onBlur={handleBlur("fullname")}
                      placeholder="Name"
                      returnKeyType="done"
                      iconName="user"
                      iconColor="grey"
                    />
                    <ErrorMessage
                      errorValue={touched.fullname && errors.fullname}
                    />

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
                    <ErrorMessage errorValue={touched.email && errors.email} />

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
                      errorValue={touched.password && errors.password}
                    />

                    <InputField
                      name="repeat_password"
                      value={values.repeat_password}
                      onChangeText={handleChange("repeat_password")}
                      onBlur={handleBlur("repeat_password")}
                      placeholder="Confirm password"
                      returnKeyType="done"
                      autoCapitalize="none"
                      secureTextEntry={true}
                      iconName="unlock"
                      iconColor="grey"
                    />
                    <ErrorMessage
                      errorValue={
                        touched.repeat_password && errors.repeat_password
                      }
                    />

                    <InputButton
                      onPress={handleSubmit}
                      disabled={!isValid}
                      buttonType="solid"
                      title="SIGN UP"
                      buttonColor="#533263"
                    />
                  </>
                )}
              </Formik>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 100,
                marginBottom: 25,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 17, color: "#7842e5" }}>
                Already have a account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Signin")}
                style={{ marginLeft: 4 }}
              >
                <Text
                  style={{
                    color: "#533263",
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                >
                  Sign in
                </Text>
              </TouchableOpacity>
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

  form: {
    width: "90%",
    marginTop: 30,
  },

  avoidKeyboard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
