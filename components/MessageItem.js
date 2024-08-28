import { View, Text } from 'react-native'
import React from 'react'

const MessageItem = ({ message, currentUser }) => {
    const isCurrentUser = currentUser.userId === message.userId;

    return (
        <View 
            style={{
                width: '96%',
                flexDirection: 'row',
                justifyContent: isCurrentUser?'flex-end':'flex-start',
                marginTop: 10,
                marginHorizontal: 10,
            }}
        >
            <View 
                style={{
                    backgroundColor: isCurrentUser ? '#93c5fd' : '#bfdbfe',
                    padding: 10,
                    borderRadius: 8,
                    maxWidth: '75%',
                }}
            >
                <Text>{message.text}</Text>
            </View>
        </View>
    );
}

export default MessageItem
