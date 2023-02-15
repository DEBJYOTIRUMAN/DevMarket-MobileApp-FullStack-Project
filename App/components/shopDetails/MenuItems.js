import React from "react";
import { View, FlatList } from "react-native";
import Items from "./Items";

export default function MenuItems({ menus, navigation }) {
    return (
        <FlatList
            data={menus}
            renderItem={({ item }) => (
                <View
                    style={{
                        marginBottom: 20,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flex: 1
                    }}
                >
                    <Items menu={item} navigation={navigation} />
                </View>
            )}
            keyExtractor={(item) => item._id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
        />
    );
}
