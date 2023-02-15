import React from "react";
import { Button } from "react-native-elements";

const PaymentInputButton = ({ title, buttonType, buttonColor, ...rest }) => (
    <Button
        {...rest}
        type={buttonType}
        title={title}
        buttonStyle={{
            borderColor: buttonColor,
            backgroundColor: buttonColor,
            borderRadius: 30,
            height: 50,
            marginBottom: 30,
            alignItems: "center",
        }}
        titleStyle={{ color: "#ffffff" }}
    />
);

export default PaymentInputButton;
