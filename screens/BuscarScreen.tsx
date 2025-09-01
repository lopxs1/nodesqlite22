import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import GradientButton from '../shared/GradientButton';

export default function BuscarScreen() {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    { id: '1', nome: 'João Silva', email: 'joao@email.com' },
    { id: '2', nome: 'Maria Souza', email: 'maria@email.com' },
    { id: '3', nome: 'Carlos Lima', email: 'carlos@email.com' },
  ];

  const handleSelectUser = (user: any) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Usuários</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectUser(item)}>
            <Card style={{ marginBottom: 12, backgroundColor: '#222' }}>
              <Card.Content>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>{item.nome}</Text>
                <Text style={{ color: '#aaa', fontSize: 14 }}>{item.email}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selectedUser} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <Card style={styles.modalCard}>
            {selectedUser && (
              <>
                <Text style={styles.userName}>{selectedUser.nome}</Text>
                <Text style={styles.userEmail}>{selectedUser.email}</Text>

                {/* Botões lado a lado */}
                <View style={styles.actionButtons}>
                  <View style={styles.buttonWrapper}>
                    <GradientButton
                      label="Editar"
                      onPress={() => console.log('Editar usuário', selectedUser)}
                      colors={['#4CAF50', '#81C784']}
                    />
                  </View>
                  <View style={styles.buttonWrapper}>
                    <GradientButton
                      label="Excluir"
                      onPress={() => console.log('Excluir usuário', selectedUser)}
                      colors={['#FF416C', '#FF4B2B']}
                    />
                  </View>
                </View>

                <Button onPress={handleCloseModal} style={{ marginTop: 12 }}>
                  Fechar
                </Button>
              </>
            )}
          </Card>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, justifyContent: 'center' },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: { width: '100%', backgroundColor: '#222', padding: 16 },
  userName: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  userEmail: { color: '#aaa', fontSize: 14, marginBottom: 16 },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  buttonWrapper: { flex: 1, marginHorizontal: 5 },
});
