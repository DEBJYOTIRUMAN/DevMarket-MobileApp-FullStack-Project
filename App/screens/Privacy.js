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
import bgImage from "../assets/images/privacy.jpg";
import BottomTabs from "../components/home/BottomTabs";

export default function Privacy({ navigation }) {
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
            <MaterialCommunityIcons name="keyboard-backspace" size={32} />
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
            Privacy Policy
          </Text>
          <Divider style={{ marginTop: 16 }} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Our Privacy :
            </Text>
            <Text
              style={{
                marginTop: 8,
                marginHorizontal: 20,
                fontSize: 15,
                textAlign: "justify",
              }}
            >
              Your privacy is important to us. This privacy statement explains
              the personal data Microsoft processes, how Microsoft processes it,
              and for what purposes. Microsoft offers a wide range of products,
              including server products used to help operate enterprises
              worldwide, devices you use in your home, software that students
              use at school, and services developers use to create and host
              what’s next. References to Microsoft products in this statement
              include Microsoft services, websites, apps, software, servers, and
              devices. Please read the product-specific details in this privacy
              statement, which provide additional relevant information. This
              statement applies to the interactions Microsoft has with you and
              the Microsoft products listed below, as well as other Microsoft
              products that display this statement. Microsoft collects data from
              you, through our interactions with you and through our products.
              You provide some of this data directly, and we get some of it by
              collecting data about your interactions, use, and experiences with
              our products. The data we collect depends on the context of your
              interactions with Microsoft and the choices you make, including
              your privacy settings and the products and features you use. We
              also obtain data about you from third parties. If you represent an
              organization, such as a business or school, that utilizes
              Enterprise and Developer Products from Microsoft, please see the
              Enterprise and developer products section of this privacy
              statement to learn how we process your data. If you are an end
              user of a Microsoft product or a Microsoft account provided by
              your organization, please see the Products provided by your
              organization and the Microsoft account sections for more
              information. You have choices when it comes to the technology you
              use and the data you share. When we ask you to provide personal
              data, you can decline. Many of our products require some personal
              data to provide you with a service. If you choose not to provide
              data required to provide you with a product or feature, you cannot
              use that product or feature. Likewise, where we need to collect
              personal data by law or to enter into or carry out a contract with
              you, and you do not provide the data, we will not be able to enter
              into the contract; or if this relates to an existing product
              you’re using, we may have to suspend or cancel it. We will notify
              you if this is the case at the time. Where providing the data is
              optional, and you choose not to share personal data, features like
              personalization that use such data will not work for you. We also
              use the data to operate our business, which includes analyzing our
              performance, meeting our legal obligations, developing our
              workforce, and doing research. In carrying out these purposes, we
              combine data we collect from different contexts (for example, from
              your use of two Microsoft products) or obtain from third parties
              to give you a more seamless, consistent, and personalized
              experience, to make informed business decisions, and for other
              legitimate purposes. Our processing of personal data for these
              purposes includes both automated and manual (human) methods of
              processing.
            </Text>
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Terms of Service :
            </Text>
            <Text
              style={{
                marginTop: 8,
                marginHorizontal: 20,
                fontSize: 15,
                textAlign: "justify",
              }}
            >
              Cookies are small text files placed on your device to store data
              that can be recalled by a web server in the domain that placed the
              cookie. We use cookies and similar technologies for storing and
              honoring your preferences and settings, enabling you to sign in,
              providing interest-based advertising, combating fraud, analyzing
              how our products perform, and fulfilling other legitimate
              purposes. Microsoft apps use additional identifiers, such as the
              advertising ID in Windows described in the Advertising ID section
              of this privacy statement, for similar purposes. We also use “web
              beacons” to help deliver cookies and gather usage and performance
              data. Our websites may include web beacons, cookies, or similar
              technologies from third-party service providers. You have a
              variety of tools to control the data collected by cookies, web
              beacons, and similar technologies. For example, you can use
              controls in your internet browser to limit how the websites you
              visit are able to use cookies and to withdraw your consent by
              clearing or blocking cookies. If you lose access to your work or
              school account (in event of change of employment, for example),
              you may lose access to products and the content associated with
              those products, including those you acquired on your own behalf,
              if you used your work or school account to sign in to such
              products. Many Microsoft products are intended for use by
              organizations, such as schools and businesses. Please see the
              Enterprise and developer products section of this privacy
              statement.
            </Text>
          </View>
        </ScrollView>
        <Divider width={1} />
        <BottomTabs navigation={navigation} activeTab="Account" />
      </ImageBackground>
    </SafeAreaView>
  );
}
