import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameCard = ({ game, onJoin }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{game.name}</Text>
      <Text style={styles.info}>Entry Fee: {game.entryFee} coins</Text>
      <Text style={styles.info}>Players: {game.currentPlayers}</Text>
      <Button title="Join Game" onPress={() => onJoin(game)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default GameCard;
