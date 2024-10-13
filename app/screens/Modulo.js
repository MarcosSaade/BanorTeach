import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Theme from '../constants/Theme';
import { CourseContent } from '../constants/CourseContent'; // Ensure this is the correct import

const Modulo = ({ route, navigation }) => {
  const { courseId } = route.params;  // Get courseId from navigation params
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  
  // Safeguard against undefined course
  const course = CourseContent[courseId]; // Get the course object
  if (!course) {
    return (
      <View style={styles.container}>
        <Text>Course not found.</Text>  // Handle course not found
      </View>
    );
  }

  const continueHandler = () => {
    if (currentTextIndex < course.content.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1);
    } else {
      setPointsEarned(100);
    }
  };

  const backHandler = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={backHandler} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#EB0029" />
      </TouchableOpacity>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.content}>{course.content[currentTextIndex]}</Text>
      {pointsEarned > 0 && (
        <Text style={styles.pointsMessage}>¡Ganaste {pointsEarned} puntos!</Text>
      )}
      <View style={styles.buttonContainer}>
        {currentTextIndex === course.content.length - 1 ? (
          <Button 
            title="Mi historia" 
            onPress={() => navigation.navigate('Historia', { cursoActual: course })} // Pass the current course
            color="#EB0029" 
          />
        ) : (
          <Button title="Continuar" onPress={continueHandler} color="#EB0029" />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#EB0029',
  },
  content: {
    fontSize: 18,
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
  },
  pointsMessage: {
    fontSize: 18,
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default Modulo;
