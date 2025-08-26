import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import GradientButton from '../shared/GradientButton'; // ✅ Corrigido o caminho

export default function InserirScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleInserir = () => {
    if (!nome || !email || !telefone) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    Alert.alert('Sucesso', `Usuário ${nome} inserido!`);
    setNome('');
    setEmail('');
    setTelefone('');
  };

  const inputTheme = {
    colors: {
      text: '#fff',         // texto digitado
      primary: '#fff',      // cor do contorno e label quando focado
      placeholder: '#ccc',  // cor do label quando não focado
    },
  };

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    keyboardType: 'default' | 'email-address' | 'phone-pad',
    id: string
  ) => {
    return (
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inserir Usuário</Text>

      {renderInput('Nome', nome, setNome, 'default', 'nome')}
      {renderInput('Email', email, setEmail, 'email-address', 'email')}
      {renderInput('Telefone', telefone, setTelefone, 'phone-pad', 'telefone')}

      <View style={styles.buttonWrapper}>
        <GradientButton label="Inserir" onPress={handleInserir} />
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
    marginBottom: 16, // espaçamento entre inputs
  },
  buttonWrapper: {
    marginTop: 24, // espaçamento entre último input e botão
  },
});
