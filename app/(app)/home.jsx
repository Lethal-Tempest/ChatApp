import { View, Text, TouchableOpacity, Alert, StatusBar, Image } from 'react-native';
import { useAuth } from '@/context/authContext';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ChatList from '../../components/ChatList'
import { usersRef } from '@/firebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';

const Home = () => {
  const { logout } = useAuth();
  const { user } = useAuth();
  const profile = user.profileUrl
  const [users, setUsers] = useState([])

  

  const getUsers = async () => {
    console.log("Starting getUsers");

    // Fetch users where userId is not equal to the current user's userId
    const q = query(usersRef, where('userId', '!=', user.userId));
    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
    console.log(data);
  };

  useEffect(() => {
    async function fetchUsers() {
      if (user.userId) {
        console.log(user);
        await getUsers();
      }
    }
    fetchUsers();
  }, [user.userId]);

  const handleLogout = async () => {
    try {
      console.log("Trying to log out")
      await logout();
      Alert.alert("Logged Out", "You have been logged out successfully.");
      router.replace('/Index');
    } catch (e) {
      Alert.alert("Logout Failed", "An error occurred while logging out. Please try again.");
    }
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'rgb(124 58 237)'} />
      <View className="bg-blue-100 w-full h-full flex justify-center items-center">
        <View
          className="w-full h-16 bg-violet-600 flex flex-row items-center justify-between"
          style={{ marginTop: StatusBar.currentHeight }}
        >
          <Text className="text-white text-2xl relative left-5">Chats</Text>
          <Menu>
            <MenuTrigger>
              <Image source={{ uri: profile }} className="w-11 h-11 relative right-5 rounded-full" />
            </MenuTrigger>
            <MenuOptions customStyles={
              {
                optionsContainer: {
                  borderRadius: 5,
                  marginTop: 50,
                  marginLeft: -5
                }
              }}>
              <MenuOption onSelect={() => alert(`Save`)}>
                <Text className="text-md p-1 ml-1">Profile</Text>
              </MenuOption>
              <View className="h-[1px] w-full bg-gray-200" />
              <MenuOption onSelect={handleLogout} >
                <Text className="text-red-600 text-md p-1 ml-1">Log out</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <View className="w-full h-5/6 flex-1">
          {users.length > 0 ? (
            <ChatList currentUser={user} users={users} />
          ) : (
            <Text>No data</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default Home;
