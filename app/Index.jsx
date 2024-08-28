import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Index = () => {
  const handleLogin = () => {
    router.push('(auth)/signIn')
  }

  const handleSignup = () => {
    router.push('(auth)/signUp')
  }

  return (
    <View className="bg-blue-200 w-full h-full flex justify-center items-center">
      <Text className="text-3xl text-center font-bold text-blue-900">Welcome to</Text>
      <Text className="text-6xl font-extrabold text-violet-900 m-3">ChatApp</Text>
      <Text className="text-xl text-center text-blue-900 my-8">Your personalised chat app</Text>
      <View className="w-11/12 h-fit flex flex-row justify-around items-center">
        <TouchableOpacity
          className="w-2/5 h-12 bg-violet-600 rounded-full flex items-center justify-center"
          onPress={handleLogin}
        >
          <Text className="text-white text-lg">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-2/5 h-12 bg-violet-600 rounded-full flex items-center justify-center"
          onPress={handleSignup}
        >
          <Text className="text-white text-lg">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Index
