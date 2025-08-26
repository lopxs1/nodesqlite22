import React from 'react';
import { Appbar } from 'react-native-paper';

export default function Header() {
  return (
    <Appbar.Header style={{ backgroundColor: '#000' }}>
      <Appbar.Content title="Gestão de Usuários" titleStyle={{ color: '#fff', fontWeight: 'bold' }} />
    </Appbar.Header>
  );
}
