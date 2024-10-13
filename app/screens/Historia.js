import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from '../constants/Theme';

const Historia = ({ navigation, route }) => {
  const { cursoActual } = route.params; // Assuming cursoActual is passed correctly from the previous screen
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingConsequences, setLoadingConsequences] = useState(false);
  const [error, setError] = useState(null);
  const [optionsSelected, setOptionsSelected] = useState(false);

  // State variables for user data
  const [nombre, setNombre] = useState('');
  const [metaFinanciera, setMetaFinanciera] = useState('');
  const [rangoEdad, setRangoEdad] = useState('');

  // Function to retrieve user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        setNombre(userData.name);
        setMetaFinanciera(userData.goal);
        setRangoEdad(userData.age);
      }
    } catch (error) {
      console.error('Error loading user data', error);
    }
  };

  const fetchStoryContent = async () => {
    try {
      const response = await fetch('http://192.168.51.157:3000/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `${Theme.storyMessage.message} 
            Nombre: ${nombre}, 
            Meta Financiera: ${metaFinanciera}, 
            Curso Actual: ${cursoActual.title},  // Pass the course title here
            Rango de Edad: ${rangoEdad}`
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      setResponseText(data.responseText.parts[0].text);
    } catch (err) {
      setError('Error fetching content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData(); // Load user data when the component mounts
    fetchStoryContent();
  }, [nombre, metaFinanciera, rangoEdad, cursoActual]); // Fetch story after loading user data

  const handleOptionPress = async (option) => {
    setLoadingConsequences(true);
    setOptionsSelected(true); // Set options selected to true

    try {
      const response = await fetch('http://192.168.51.157:3000/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `${responseText} El usuario eligió la opción ${option}. Genera el final de la historia con retroalimentación.`
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      setResponseText(data.responseText.parts[0].text);
    } catch (err) {
      setError('Error fetching content. Please try again.');
    } finally {
      setLoadingConsequences(false); // Hide loading message after fetching
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Espera un momento mientras generamos tu historia personalizada...</Text>
        </View>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Historia Generada:</Text>
          <Text style={styles.responseText}>{responseText}</Text>
          
          {loadingConsequences && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text style={styles.loadingText}>Generando la consecuencia de tu acción...</Text>
            </View>
          )}

          {!optionsSelected ? (
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="A" onPress={() => handleOptionPress('A')} color="#EB0029" />
              </View>
              <View style={styles.button}>
                <Button title="B" onPress={() => handleOptionPress('B')} color="#EB0029" />
              </View>
              <View style={styles.button}>
                <Button title="C" onPress={() => handleOptionPress('C')} color="#EB0029" />
              </View>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Regresar a Cursos" onPress={() => navigation.navigate('Cursos')} color="#EB0029" />
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#EB0029',
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    width: '100%',
    marginVertical: 10,
  },
});

export default Historia;
