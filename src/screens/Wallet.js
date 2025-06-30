import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useWallet } from '../context/WalletContext';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const Wallet = ({ navigation }) => {
  const { coins, transactions, addCoins } = useWallet();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <FontAwesome name="money" size={24} color="#4CAF50" /> Wallet
      </Text>

      <View style={styles.balanceCard}>
        <MaterialIcons name="account-balance-wallet" size={30} color="#444" />
        <Text style={styles.balanceText}>Total Coins:</Text>
        <Text style={styles.coinText}>
          <FontAwesome name="bitcoin" size={24} color="#f4b400" /> {coins}
        </Text>
      </View>

      <View style={styles.rechargeButtons}>
        <TouchableOpacity style={styles.recharge} onPress={() => addCoins(20)}>
          <MaterialIcons name="add-circle" size={18} color="#fff" />
          <Text style={styles.rechargeText}>Recharge 20</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.recharge} onPress={() => addCoins(50)}>
          <MaterialIcons name="add-circle" size={18} color="#fff" />
          <Text style={styles.rechargeText}>Recharge 50</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>🧾 Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={<Text style={styles.empty}>No transactions yet</Text>}
        renderItem={({ item }) => (
          <Text style={styles.transaction}>
            {item.type === 'credit' ? '➕' : '➖'} {item.amount} coins on{' '}
            {new Date(item.date).toLocaleString()}
          </Text>
        )}
      />

      <TouchableOpacity style={styles.lobbyButton} onPress={() => navigation.navigate('GameLobby')}>
        <Text style={styles.lobbyText}>🎮 Go to Game Lobby</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subHeader: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 8 },
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    elevation: 2,
  },
  balanceText: { marginLeft: 8, fontSize: 18, fontWeight: 'bold', flex: 1 },
  coinText: { fontSize: 18, fontWeight: 'bold', color: '#f4b400' },
  rechargeButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  recharge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  rechargeText: { color: '#fff', marginLeft: 6, fontWeight: 'bold' },
  transaction: { marginBottom: 4, color: '#333' },
  empty: { fontStyle: 'italic', color: '#888' },
  lobbyButton: {
    marginTop: 24,
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
  },
  lobbyText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});

export default Wallet;
