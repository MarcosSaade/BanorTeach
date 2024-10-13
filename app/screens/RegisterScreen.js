import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const RegistrationScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      try {
        await AsyncStorage.setItem('userData', JSON.stringify({
          email,
          name,
          age,
          job,
          goal
        }));
        navigation.navigate('App');
      } catch (error) {
        console.error('Error saving data', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
        {step === 1 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu correo electrónico"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Escribe tu contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </>
        )}
        {step === 2 && (
          <>
            <Text style={styles.label}>Elige tu meta financiera:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={goal}
                style={styles.picker}
                onValueChange={(itemValue) => setGoal(itemValue)}
              >
                <Picker.Item label="Ahorrar para un viaje" value="viaje" />
                <Picker.Item label="Comprar una casa" value="casa" />
                <Picker.Item label="Planificar la jubilación" value="jubilacion" />
              </Picker>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </>
        )}
        {step === 3 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu nombre"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Escribe tu edad"
              placeholderTextColor="#999"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={job}
                style={styles.picker}
                onValueChange={(itemValue) => setJob(itemValue)}
              >
                <Picker.Item label="Selecciona tu ocupación" value="" />
                <Picker.Item label="Estudiante" value="estudiante" />
                <Picker.Item label="Empleado" value="empleado" />
                <Picker.Item label="Desempleado" value="desempleado" />
                <Picker.Item label="Independiente" value="independiente" />
              </Picker>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    backgroundColor: '#FF0000',
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 100,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  input: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#FF0000',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    fontWeight: '600',
  },
});

export default RegistrationScreen;