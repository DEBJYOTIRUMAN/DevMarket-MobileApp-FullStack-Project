import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import bgImage from "../assets/images/support.jpg";
import BottomTabs from "../components/home/BottomTabs";

export default function Support({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
        <View style={{ marginTop: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              left: 10,
              zIndex: 10,
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
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              height: 40,
              textAlignVertical: "center",
            }}
          >
            Support
          </Text>
          <Divider style={{ marginTop: 16 }} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Our Support :
            </Text>
            <Text
              style={{
                marginTop: 8,
                marginHorizontal: 20,
                fontSize: 15,
                textAlign: "justify",
              }}
            >
              We believe in efforts and intention, in doing your best, and in
              celebrating the little wins. That’s why we created Boon Market, a
              marketplace of goods that do good—for you, your community, and the
              planet. Whether you’re passionate about reducing toxins at home,
              donating to your local school, or eliminating single use plastic,
              we support you. From waste-free options to cleaning, personal
              care, and lunch on the go, our goods are eco friendly, uplifting,
              and intended to make your life just a little bit better. We’ve
              teamed up with incredible partners from around the country to
              offer the best in each category. Because if we all do our parts,
              we’ll generate more goodness than any one of us could achieve
              alone. But the impact doesn’t stop there. Our platform makes it
              easy to give back to the cause of your choice. Shop well knowing
              that a percentage of your purchase will go directly toward the
              greater good. Boon was founded by Lily Kanter, co-founder of
              Serena and Lily, mother of three, and passionate social
              changemaker. We have been featured on The View, Good Morning
              America, The Today Show, Real Simple Magazine, Good Housekeeping,
              and more.
            </Text>
          </View>

          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Contact Details
          </Text>

          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <Ionicons name="location-sharp" size={24} />
              <Text
                style={{
                  textAlignVertical: "center",
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingHorizontal: 5,
                }}
              >
                Address
              </Text>
            </View>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Dev Cart Store Center, English Bazar, India
            </Text>
          </>

          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <Ionicons name="call-sharp" size={24} />
              <Text
                style={{
                  textAlignVertical: "center",
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingHorizontal: 5,
                }}
              >
                Lets Talk
              </Text>
            </View>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              +91 82504469610
            </Text>
          </>

          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <Ionicons name="mail-sharp" size={24} />
              <Text
                style={{
                  textAlignVertical: "center",
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingHorizontal: 5,
                }}
              >
                Sale Support
              </Text>
            </View>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              contact@rumon.com
            </Text>
          </>
          <TouchableOpacity
            style={{
              width: 160,
              height: 60,
              backgroundColor: "#7842e5",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              width: "40%",
              height: 60,
              margin: 20,
              alignSelf: "flex-end",
            }}
            onPress={() => navigation.navigate("ContactUs")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Contact Us
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Divider width={1} />
        <BottomTabs navigation={navigation} activeTab="Account" />
      </ImageBackground>
    </SafeAreaView>
  );
}
