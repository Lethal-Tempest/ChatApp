import { View, Text, ScrollView } from 'react-native'
import MessageItem from './MessageItem'
import React from 'react'

const MessageList = ({messages, currentUser}) => {
  return (
    <ScrollView>
        {
            messages.map((message, index)=>{
                return (
                    <MessageItem message={message} key={index} currentUser={currentUser} />
                )
            })
        }
    </ScrollView>
  )
}

export default MessageList