import React from 'react';
import { Stack } from 'expo-router';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { router } from 'expo-router';
import {Entypo} from '@expo/vector-icons';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='home' options={{ headerShown: false }} />
      <Stack.Screen name="chatRoom" options={{headerShown: false}} />
    </Stack>
  );
}

export default _layout;
