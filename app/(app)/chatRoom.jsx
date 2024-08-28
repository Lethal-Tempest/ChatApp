import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'react-native'
import { Entypo, Ionicons, Feather } from '@expo/vector-icons'
import MessageList from '../../components/MessageList'
import { useAuth } from '@/context/authContext'
import getRoomId from '../../utils'
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

const ChatRoom = () => {
    const item = useLocalSearchParams();
    const { user } = useAuth();
    const [Messages, setMessages] = useState([]);
    const textRef = useRef('');
    const inputRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExists();
        let roomId = getRoomId(user.userId, item.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'asc'));
        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return (doc.data());
            });
            setMessages([...allMessages]);
        });
        return unsub;
    }, []);

    const createRoomIfNotExists = async () => {
        let RoomId = getRoomId(user.userId, item.userId);
        await setDoc(doc(db, 'rooms', RoomId), {
            RoomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    }

    const handleSendMessage = async () => {
        let message = textRef.current?.trim();
        if (!message) return;
        try {
            let roomId = getRoomId(user.userId, item.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messagesRef = collection(docRef, "messages");
            if (inputRef) inputRef.current.clear();
            const newDoc = await addDoc(messagesRef, {
                userId: user.userId,
                text: message,
                profileUrl: user.profileUrl,
                senderName: user.username,
                createdAt: Timestamp.fromDate(new Date())
            });
            console.log(newDoc.id);
        } catch (err) {
            Alert.alert('Message: ', err.message);
        }
    }

    return (
        <>
            <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'rgb(124 58 237)'} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View className="w-full h-full bg-blue-100">
                    <View
                        className="w-full h-16 bg-violet-600 flex flex-row items-center justify-between"
                        style={{ marginTop: StatusBar.currentHeight }}
                    >
                        <View className="w-fit h-full flex flex-row items-center">
                            <View className="h-fit w-fit ml-2">
                                <Entypo name='chevron-left' color={'#fff'} size={30} onPress={router.back} />
                            </View>
                            <Image source={{ uri: item.profileUrl }} className="w-10 h-10 rounded-full" />
                            <Text className="text-white text-2xl relative left-2">{item.username}</Text>
                        </View>
                        <View className="w-1/3 h-full flex flex-row items-center justify-evenly">
                            <Ionicons name='call' color={'#fff'} size={20} />
                            <Ionicons name='videocam' color={'#fff'} size={20} />
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                        <MessageList messages={Messages} currentUser={user} />
                    </ScrollView>
                    <View className="w-full h-fit">
                        <View className="w-11/12 h-12 rounded-full bg-white flex flex-row justify-between items-center mb-2 self-center">
                            <TextInput
                                ref={inputRef}
                                className="w-5/6 h-12 pl-4"
                                placeholder='Enter your message...'
                                onChangeText={value => textRef.current = value}
                            />
                            <TouchableOpacity
                                className="h-10 w-10 bg-violet-600 rounded-full mr-2 flex items-center justify-center"
                                onPress={handleSendMessage}
                            >
                                <Feather name='send' color={'#fff'} size={21} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default ChatRoom
