// src/components/FontTest.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FontTest = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontFamily: 'Inter_18pt-Regular' }]}>
        Inter Regular - Hello World
      </Text>
      <Text style={[styles.text, { fontFamily: 'Inter_18pt-Medium' }]}>
        Inter Medium - Hello World
      </Text>
      <Text style={[styles.text, { fontFamily: 'Inter_18pt-Bold' }]}>
        Inter Bold - Hello World
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default FontTest;
