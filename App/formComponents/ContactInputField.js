import React from 'react'
import { Input } from 'react-native-elements'
import { View } from 'react-native'


const ContactInputField = ({ name, placeholder, value, txtArea, ...rest }) => (
        
            txtArea ? (
                <View>
                <Input
                {...rest}
                inputContainerStyle={{borderBottomWidth:0}}
                name={name}
                value={value}
                placeholder={placeholder}
                multiline = {true}
                numberOfLines = {8}
                style={{textAlignVertical: 'top', marginTop: 10, padding: 20, borderRadius: 10, backgroundColor: 'white'}}
            />
            </View>
            ) : (
                <View>
                <Input
                {...rest}
                inputContainerStyle={{borderBottomWidth:0}}
                name={name}
                value={value}
                placeholder={placeholder}
                style={{marginTop: 10, padding: 20, borderRadius: 10, backgroundColor: 'white'}}
            />
            </View>
            )
            
        
)

export default ContactInputField;