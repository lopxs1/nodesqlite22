// screens/BuscarScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, Modal, StyleSheet, Alert, ScrollView } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import GradientButton from '../shared/GradientButton';
import { Conexao, selectUsuario, selectUsuarioId, deleteUsuario, updateUsuario, createTable } from '../Conf/Banco';

export default function BuscarScreen() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editNome, setEditNome] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const db = await Conexao();
      if (db) {
        await createTable(db);
        const result = await selectUsuario(db);
        setUsers(result || []);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      Alert.alert('Erro', 'Não foi possível carregar os usuários');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar usuários quando a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [loadUsers])
  );

  const handleSelectUser = (user: any) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);

  // Função para abrir modal de edição
  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setEditNome(user.NOME_US);
    setEditEmail(user.EMAIL_US);
    setSelectedUser(null); // Fechar modal de detalhes
  };

  // Função para salvar edição
  const handleSaveEdit = async () => {
    if (!editNome.trim() || !editEmail.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const db = await Conexao();
      if (db) {
        await updateUsuario(db, editingUser.ID_US, editNome.trim(), editEmail.trim());
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
        setEditingUser(null);
        loadUsers(); // Recarregar lista
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o usuário');
    }
  };

  // Função para excluir usuário
  const handleDeleteUser = (user: any) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir o usuário ${user.NOME_US}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              const db = await Conexao();
              if (db) {
                await deleteUsuario(db, user.ID_US);
                Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
                setSelectedUser(null); // <- ADICIONAR ESTA LINHA
                loadUsers(); // Recarregar lista
              }
            } catch (error) {
              console.error('Erro ao excluir usuário:', error);
              Alert.alert('Erro', 'Não foi possível excluir o usuário');
            }
          }
        }
      ]
    );
  };

  const inputTheme = {
    colors: {
      text: '#fff',
      primary: '#fff',
      placeholder: '#ccc',
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Usuários</Text>

      {loading ? (
        <Text style={styles.loadingText}>Carregando usuários...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.ID_US.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectUser(item)}>
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.userName}>{item.NOME_US}</Text>
                  <Text style={styles.userEmail}>{item.EMAIL_US}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>
          }
        />
      )}

      {/* Modal de Detalhes do Usuário */}
      <Modal visible={!!selectedUser} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <Card style={styles.modalCard}>
            {selectedUser && (
              <View>
                <Text style={styles.modalUserName}>{selectedUser.NOME_US}</Text>
                <Text style={styles.modalUserEmail}>{selectedUser.EMAIL_US}</Text>

                <View style={styles.actionButtons}>
                  <View style={styles.buttonWrapper}>
                    <GradientButton
                      label="Editar"
                      onPress={() => handleEditUser(selectedUser)}
                      colors={['#4CAF50', '#81C784']}
                    />
                  </View>
                  <View style={styles.buttonWrapper}>
                    <GradientButton
                      label="Excluir"
                      onPress={() => handleDeleteUser(selectedUser)}
                      colors={['#FF416C', '#FF4B2B']}
                    />
                  </View>
                </View>

                <Button onPress={handleCloseModal} style={styles.closeButton}>
                  Fechar
                </Button>
              </View>
            )}
          </Card>
        </View>
      </Modal>

      {/* Modal de Edição */}
      <Modal visible={!!editingUser} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalTitle}>Editar Usuário</Text>
            
            <TextInput
              label="Nome"
              value={editNome}
              onChangeText={setEditNome}
              mode="outlined"
              style={styles.input}
              textColor="#fff"
              theme={inputTheme}
            />
            
            <TextInput
              label="Email"
              value={editEmail}
              onChangeText={setEditEmail}
              mode="outlined"
              keyboardType="email-address"
              style={styles.input}
              textColor="#fff"
              theme={inputTheme}
            />

            <View style={styles.actionButtons}>
              <View style={styles.buttonWrapper}>
                <GradientButton
                  label="Cancelar"
                  onPress={() => setEditingUser(null)}
                  colors={['#666', '#999']}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <GradientButton
                  label="Salvar"
                  onPress={handleSaveEdit}
                  colors={['#4CAF50', '#81C784']}
                />
              </View>
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000', 
    padding: 20, 
    justifyContent: 'center' 
  },
  title: { 
    color: '#fff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#222'
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  userEmail: {
    color: '#aaa',
    fontSize: 14
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: { 
    width: '100%', 
    backgroundColor: '#222', 
    padding: 16,
    maxHeight: '80%'
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  modalUserName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  modalUserEmail: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 16
  },
  input: {
    backgroundColor: '#000',
    marginBottom: 16
  },
  actionButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 16 
  },
  buttonWrapper: { 
    flex: 1, 
    marginHorizontal: 5 
  },
  closeButton: {
    marginTop: 12
  },
});
