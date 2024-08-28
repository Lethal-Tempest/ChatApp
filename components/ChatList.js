import { View, FlatList } from 'react-native';
import React from 'react';
import ChatItem from './ChatItem';

const ChatList = ({ currentUser, users }) => {
    return (
        <View className="flex-1">
            <FlatList
                data={users}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}
                keyExtractor={item => item.userId} // Use a stable, unique key
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <ChatItem
                        currentUser={currentUser}
                        item={item}
                        index={index}
                    />
                )}
            />
        </View>
    );
};

export default ChatList;
