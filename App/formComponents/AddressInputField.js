import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

const AddressInputField = ({ name, placeholder, value, ...rest }) => (
    <View>
        <Input
            {...rest}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            name={name}
            value={value}
            placeholder={placeholder}
            style={{marginTop: 10, padding: 15, borderRadius: 10, backgroundColor: '#ebefea'}}
        />
    </View>
);

export default AddressInputField;
