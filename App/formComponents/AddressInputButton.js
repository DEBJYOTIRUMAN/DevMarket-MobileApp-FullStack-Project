import React from 'react'
import { Button } from 'react-native-elements'

const AddressInputButton = ({ title, buttonType, buttonColor, ...rest }) => (
    <Button
        {...rest}
        type={buttonType}
        title={title}
        buttonStyle={{ borderColor: buttonColor, backgroundColor: buttonColor, borderRadius: 8, height: 50, marginBottom: 30, width: '96%', alignSelf: 'center' }}
        titleStyle={{ color: '#ffffff' }}
    />
)

export default AddressInputButton