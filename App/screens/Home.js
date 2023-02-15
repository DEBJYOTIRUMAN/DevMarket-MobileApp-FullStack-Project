import React, { useEffect, useState } from "react";
import { View, ScrollView, ImageBackground } from "react-native";
import { Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTabs from "../components/home/BottomTabs";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import SearchBarDetails from "../components/home/SearchBarDetails";
import Shops from "../components/home/Shops";
import bgImage from "../assets/images/home.jpg";

export default function Home({ navigation }) {
  const [shopData, setShopData] = useState([]);
  const [activeTab, setActiveTab] = useState("Delivery");
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  // Search Get Request
  useEffect(() => {
    if (query == "") {
      return;
    }
    fetch(`https://devmarket-nknv.onrender.com/api/products/search/${query}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
      });
  }, [query]);
  // Shops Get Request
  useEffect(() => {
    fetch(`https://devmarket-nknv.onrender.com/api/shops/${activeTab}`)
      .then((response) => response.json())
      .then((shops) => {
        setShopData(shops);
      });
  }, [activeTab]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
        <View style={{ padding: 15 }}>
          <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <SearchBar
            query={query}
            setQuery={setQuery}
            setSearchData={setSearchData}
          />
        </View>

        <SearchBarDetails
          query={query}
          searchData={searchData}
          navigation={navigation}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Categories navigation={navigation} />
          <Shops shopData={shopData} navigation={navigation} />
        </ScrollView>

        <Divider width={1} />
        <BottomTabs navigation={navigation} />

      </ImageBackground>
    </SafeAreaView>
  );
}
