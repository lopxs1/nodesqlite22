import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import GradientButton from '../shared/GradientButton'; // ✅ Corrigido o caminho
import { Conexao, inserirUsuario, createTable } from '../Conf/Banco';

export default function InserirScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // ... existing code ...

const handleInserir = async () => {
  if (!nome || !email) {
    Alert.alert('Erro', 'Preencha todos os campos');
    return;
  }

  try {
    // Criar conexão com o banco
    const db = await Conexao();
    
    if (db) {
      // Criar tabela se não existir
      await createTable(db);
      
      // Inserir usuário
      await inserirUsuario(db, nome, email);
      
      Alert.alert('Sucesso', `Usuário ${nome} inserido com sucesso!`);
      setNome('');
      setEmail('');
    }
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    Alert.alert('Erro', 'Não foi possível inserir o usuário. Tente novamente.');
  }
};

// ... existing code ...

  const inputTheme = {
    colors: {
      text: '#fff',
      primary: '#fff',
      placeholder: '#ccc',
    },
  };

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    keyboardType: 'default' | 'email-address',
    id: string
  ) => (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      keyboardType={keyboardType}
      style={styles.input}
      textColor="#fff"
      onFocus={() => setFocusedInput(id)}
      onBlur={() => setFocusedInput(null)}
      theme={inputTheme}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inserir Usuário</Text>

      {renderInput('Nome', nome, setNome, 'default', 'nome')}
      {renderInput('Email', email, setEmail, 'email-address', 'email')}

      <View style={styles.buttonWrapper}>
        <GradientButton
          label="Inserir"
          onPress={handleInserir}
          colors={['#6A0DAD', '#FF69B4', '#FFDAB9']}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#000',
    borderRadius: 6,
    marginBottom: 16,
  },
  buttonWrapper: {
    marginTop: 24,
  },
});
