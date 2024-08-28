import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { useAuth } from '../../context/authContext';
import { router } from 'expo-router';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleUserChange = (value) => {
    setForm({ ...form, email: value });
  };

  const handlePassChange = (value) => {
    setForm({ ...form, password: value });
  };

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Sign In", "Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await login(form.email, form.password);
      if (!response.success) {
        Alert.alert("Sign In Failed", response.msg);
      } else {
        Alert.alert("Success", "Signed in successfully!");
        router.replace('/(app)/home'); // Ensure this path is correct
      }
    } catch (e) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-blue-200 w-full h-full flex justify-center items-center">
      <Text className="text-3xl font-bold text-violet-800 mb-10">Sign In</Text>
      <View className="w-5/6 h-fit flex flex-col">
        <Text className="text-xl">Email ID</Text>
        <TextInput
          className="bg-white w-full rounded-full p-2 my-2 mb-5"
          onChangeText={handleUserChange}
          value={form.email}
        />
        <Text className="text-xl">Password</Text>
        <TextInput
          className="bg-white w-full rounded-full p-2 my-2"
          onChangeText={handlePassChange}
          value={form.password}
          secureTextEntry // Ensures password is obscured
        />
        <View className="w-full h-fit my-5 flex items-center">
          <TouchableOpacity
            className="w-2/5 h-12 bg-violet-600 rounded-full flex items-center justify-center"
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text className="text-white text-lg">{loading ? "Signing In..." : "Sign In"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
