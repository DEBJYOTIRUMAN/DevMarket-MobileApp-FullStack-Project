import React from 'react'
import { Button } from 'react-native-elements'

const ContactInputButton = ({ title, buttonType, buttonColor, ...rest }) => (
    <Button
        {...rest}
        type={buttonType}
        title={title}
        buttonStyle={{ borderColor: buttonColor, backgroundColor: buttonColor, borderRadius: 8, width: '50%', alignSelf: 'flex-end', height: 60, marginBottom: 30 }}
        titleStyle={{ color: '#ffffff' }}
    />
)

export default ContactInputButton