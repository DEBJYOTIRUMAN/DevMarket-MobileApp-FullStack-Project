import React from "react";
import { Input } from "react-native-elements";
import { Image, View } from "react-native";
import mastercard from "../assets/icons/mastercard.png";
import visa from "../assets/icons/visa.png";
import paypal from "../assets/icons/paypal.png";
import apple from "../assets/icons/applepay.png";
const PaymentInputField = ({ name, placeholder, value, logoName, ...rest }) =>
    !logoName ? (
        <View>
            <Input
                {...rest}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                name={name}
                value={value}
                placeholder={placeholder}
                style={{
                    backgroundColor: "#ebeaef",
                    marginTop: 10,
                    padding: 20,
                    borderRadius: 10,
                }}
            />
        </View>
    ) : (
        <View>
            <Input
                {...rest}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                name={name}
                value={value}
                placeholder={placeholder}
                rightIcon={
                    <View style={{position: 'absolute', right: 10, top: 4}}>
                        <Image
                            source={callLogo(logoName)}
                            style={{ width: 40, height: 40 }}
                        />
                    </View>
                }
                style={{
                    backgroundColor: "#ebeaef",
                    marginTop: 10,
                    padding: 20,
                    borderRadius: 10,
                }}
            />
        </View>
    );
const callLogo = (logoName) => {
    if (logoName == "mastercard") {
        return mastercard;
    }
    if (logoName == "visa") {
        return visa;
    }
    if (logoName == "paypal") {
        return paypal;
    }
    if (logoName == "applepay") {
        return apple;
    }
};
export default PaymentInputField;
