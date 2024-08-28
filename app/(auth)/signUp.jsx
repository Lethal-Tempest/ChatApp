import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { router } from 'expo-router';

const SignUp = () => {
  const [form, setForm] = useState({ username: '', url: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  
  // Correctly access the 'register' function from the AuthContext
  const { register } = useContext(AuthContext);

  const handleUserChange = (value) => {
    setForm({ ...form, username: value });
  };

  const handleProUrlChange = (value) => {
    setForm({ ...form, url: value });
  };

  const handleEmailChange = (value) => {
    setForm({ ...form, email: value });
  };

  const handlePassChange = (value) => {
    setForm({ ...form, password: value });
  };

  const handleSignUp = async () => {
    if (!form.username || !form.email || !form.url || !form.password) {
      Alert.alert("Please fill all the details");
      return;
    }
    setLoading(true);
    let response=await register(form.username, form.url, form.email, form.password)
    setLoading(false);
    Alert.alert("Got results: ", response)
    if(!response.success){
      Alert.alert("Sign Up", response.msg)
    }
    else{
      router.replace('/(app)/home')
    }
  };

  return (
    <View className="bg-blue-200 w-full h-full flex justify-center items-center">
      <Text className="text-4xl font-bold text-violet-800 mb-10">Sign Up</Text>
      <View className="w-5/6 h-fit flex flex-col">
        <Text className="text-xl">Username</Text>
        <TextInput className="bg-white w-full rounded-full p-2 my-2 mb-5" onChangeText={handleUserChange} value={form.username} />
        <Text className="text-xl">Profile URL</Text>
        <TextInput className="bg-white w-full rounded-full p-2 my-2 mb-5" onChangeText={handleProUrlChange} value={form.url} />
        <Text className="text-xl">Email ID</Text>
        <TextInput className="bg-white w-full rounded-full p-2 my-2 mb-5" onChangeText={handleEmailChange} value={form.email} />
        <Text className="text-xl">Password</Text>
        <TextInput className="bg-white w-full rounded-full p-2 my-2" onChangeText={handlePassChange} value={form.password} />
        <View className="w-full h-fit my-5 flex items-center">
          <TouchableOpacity
            className="w-2/5 h-12 bg-violet-600 rounded-full flex items-center justify-center"
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text className="text-white text-lg">{loading ? "Signing Up..." : "Sign Up"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
