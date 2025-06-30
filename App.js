import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Wallet from './src/screens/Wallet';
import GameLobby from './src/screens/GameLobby';
import GameScreen from './src/screens/GameScreen';
import { WalletProvider } from './src/context/WalletContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WalletProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Wallet">
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="GameLobby" component={GameLobby} />
          <Stack.Screen name="GameScreen" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WalletProvider>
  );
}
