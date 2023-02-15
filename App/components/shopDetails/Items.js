import React, { useState } from "react";
import { View, TouchableOpacity, Modal, Text, Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ModalCart from "../Utility/ModalCart";
export default function Items({ menu, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const singlePage = (menu) => {
    navigation.navigate("ProductDetail", menu);
  };
  return (
    <>
      <TouchableOpacity
        style={{
          width: 180,
          height: 300,
          backgroundColor: "white",
          borderRadius: 25,
        }}
        onPress={() => singlePage(menu)}
      >
        {menu.bestseller ? (
          <View
            style={{
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 10,
              borderRadius: 5,
              top: 10,
              left: 10,
            }}
          >
            <Text style={{ color: "white", padding: 5, fontSize: 11 }}>
              Bestseller
            </Text>
          </View>
        ) : (
          <></>
        )}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: menu.image }}
              style={{ height: 150, width: 150 }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontSize: 14, textAlign: "justify", fontWeight: "bold" }}
            >
              {menu.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold" }}
            >{`₹${menu.price}`}</Text>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <FontAwesome5
                name="shopping-cart"
                size={15}
                color={"white"}
                style={{
                  padding: 8,
                  backgroundColor: "black",
                  borderRadius: 2000,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {/* Modal Part Start */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalCart
          id={menu._id}
          image={menu.image}
          name={menu.name}
          price={menu.price}
          visible={setModalVisible}
        />
      </Modal>
      {/* Modal Part End */}
    </>
  );
}
