import React from 'react';
import { View, Text } from 'react-native';

const GameScreen = ({ route }) => {
  const { gameName } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{gameName}</Text>
      <Text>This is a placeholder screen for the game.</Text>
    </View>
  );
};

export default GameScreen;
