import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import GradientButton from './GradientButton';

export default function ScreenContent({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>{title}</Text>
      <GradientButton label={title} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
});
