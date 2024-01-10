import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import ContactInputField from "../formComponents/ContactInputField";
import ContactInputButton from "../formComponents/ContactInputButton";
import ErrorMessage from "../formComponents/ErrorMessage";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import bgImage from "../assets/images/contact.jpg";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";

const validationSchema = Yup.object().shape({
  name: Yup.string().label("Name").required("Please enter your name."),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter your email address."),
  message: Yup.string()
    .label("Message")
    .required("Please enter your message.")
    .max(500, " Please ensure that message has less than 500 characters."),
});
export default function ContactUs({ navigation }) {
  const [submit, setSubmit] = useState(false);
  const [contact, setContact] = useState({});
  const controlSubmit = (values) => {
    setContact(values);
    setSubmit(true);
  };
  // Post Contact Us

  useEffect(() => {
    if (!submit) {
      return;
    }
    fetch("https://devmarket-nknv.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contact.name,
        email: contact.email,
        message: contact.message,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setSubmit(false);
      });
    navigation.navigate("LoginSuccess");
  }, [submit]);
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
                  color={"grey"}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 24,
                  textAlignVertical: "center",
                  fontWeight: "bold",
                  color: "#e75480",
                }}
              >
                Contact Us
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cart")}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#e75480",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <FontAwesome5
                  name="shopping-bag"
                  size={20}
                  style={{ padding: 5 }}
                  color={"white"}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Fill up the form and our Team will get back to you within 24
              hours.
            </Text>
            <View style={styles.form}>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  message: "",
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
                    <ContactInputField
                      name="name"
                      label="Your Name"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      placeholder="Enter your name"
                      returnKeyType="done"
                      txtArea={false}
                    />
                    <ErrorMessage errorValue={touched.name && errors.name} />

                    <ContactInputField
                      name="email"
                      label="Mail"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder="Enter email"
                      keyboardType="email-address"
                      returnKeyType="done"
                      autoCapitalize="none"
                      txtArea={false}
                    />
                    <ErrorMessage errorValue={touched.email && errors.email} />

                    <ContactInputField
                      name="message"
                      label="Message"
                      value={values.message}
                      onChangeText={handleChange("message")}
                      onBlur={handleBlur("message")}
                      placeholder="Message"
                      returnKeyType="done"
                      txtArea={true}
                    />
                    <ErrorMessage
                      errorValue={touched.message && errors.message}
                    />

                    <ContactInputButton
                      onPress={handleSubmit}
                      disabled={!isValid}
                      buttonType="solid"
                      title="Send Message"
                      buttonColor="#e75480"
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
  form: {
    width: "90%",
    marginTop: 20,
  },

  avoidKeyboard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
