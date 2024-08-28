import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import getRoomId from '@/utils';
import { useEffect } from 'react';
import { doc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const ChatItem = ({ currentUser, item, index }) => {
  const openChatRoom = () => {
    router.push({ pathname: '/chatRoom', params: item })
  }
  const [lastMessage, setLastMessage] = useState(undefined)
  useEffect(() => {
    let roomId = getRoomId(currentUser.userId, item.userId);
    const docRef = doc(db, 'rooms', roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => {
        return (doc.data());
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null)
      console.log(lastMessage)
    });
    return unsub;
  }, []);
  const convertTimestampToReadableDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return date;
}

const renderTime = () => {
    if (lastMessage && lastMessage.createdAt) {
        const messageDate = convertTimestampToReadableDate(lastMessage.createdAt);
        const currentDate = new Date();

        const isToday = messageDate.toDateString() === currentDate.toDateString();

        if (isToday) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return messageDate.toLocaleDateString([], { day: 'numeric', month: 'short' });
        }
    }
    return 'No timestamp available';
}

  const renderLastMessage = () => {
    if (typeof lastMessage == 'undefined') return 'Loading...';
    if (lastMessage) {
      if (lastMessage.userId == currentUser.userId) {
        return 'You: ' + lastMessage.text
      }
      else {
        return lastMessage.text
      }
    }
    else{
      return 'Say Hi!'
    }
  }
  return (
    <TouchableOpacity className="w-full h-20 bg-blue-200 mb-2 flex flex-row items-center" onPress={openChatRoom}>
      <Image
        source={{ uri: item.profileUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv8SqkpPsO1vGo0BM_IPDpe8XBVwD5GmL1eg&s" }}
        className="h-12 w-12 mx-3 rounded-full"
      />
      <View className="mx-1 flex-1">
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="font-bold text-lg">{item.username}</Text>
          <Text className="text-gray-500 text-xs mr-3">{renderTime()}</Text>
        </View>
        <Text className="text-gray-500 text-xs">{renderLastMessage()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
