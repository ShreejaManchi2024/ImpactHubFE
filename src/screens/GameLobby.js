import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useWallet } from '../context/WalletContext';
import { FontAwesome } from '@expo/vector-icons';

const API_BASE = 'http://192.168.0.106:3000/api'; // Update with your IP

const GameLobby = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deductCoins } = useWallet();

  useEffect(() => {
    fetch(`${API_BASE}/games`)
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleJoin = async (game) => {
    try {
      await deductCoins(game.entryFee);
      navigation.navigate('GameScreen', { gameName: game.name });
    } catch (err) {
      Alert.alert('Insufficient Coins', err.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Loading games...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Game Lobby</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>
              <FontAwesome name="bitcoin" size={14} color="#f4b400" /> Entry Fee: {item.entryFee}
            </Text>
            <Text style={styles.info}>
              👥 Players: {item.currentPlayers}
            </Text>
            <TouchableOpacity style={styles.joinButton} onPress={() => handleJoin(item)}>
              <Text style={styles.joinText}>🚀 Join Game</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No games available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#fdfdfd',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#ccc',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  info: { fontSize: 14, color: '#444', marginBottom: 2 },
  joinButton: {
    marginTop: 12,
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    borderRadius: 8,
  },
  joinText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default GameLobby;
