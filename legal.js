import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      setError(null); // Reset error
      const response = await fetch(
        `http://172.16.210.14:3000/calculate?num1=${num1}&num2=${num2}&operation=${operation}`
      );
      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error);
        setResult(null);
      }
    } catch (err) {
      setError('Erro de rede ou servidor!');
      setResult(null);
    }
  };

  const getButtonStyle = (op) => {
    return operation === op ? styles.selectedButton : styles.button;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Número 1"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Número 2"
        value={num2}
        onChangeText={setNum2}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={getButtonStyle('add')}
          onPress={() => setOperation('add')}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle('-')}
          onPress={() => setOperation('-')}
        >
          <Text style={styles.buttonText}>Subtrair</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle('multiply')}
          onPress={() => setOperation('multiply')}
        >
          <Text style={styles.buttonText}>Multiplicar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle('divide')}
          onPress={() => setOperation('divide')}
        >
          <Text style={styles.buttonText}>Dividir</Text>
        </TouchableOpacity>
      </View>

      <Button title="Calcular" onPress={handleCalculate} />

      {result !== null && <Text style={styles.result}>Resultado: {result}</Text>}
      {error && <Text style={styles.error}>Erro: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});