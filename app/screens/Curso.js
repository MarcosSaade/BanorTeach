import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CourseOverview = ({ navigation }) => {
  const modules = [
    { id: 1, title: 'Finanzas Personales', color: '#EB0029', enabled: true },
    { id: 2, title: 'Ahorro', color: '#808080', enabled: false },
    { id: 3, title: 'Inversiones', color: '#808080', enabled: false },
    { id: 4, title: 'Crédito', color: '#808080', enabled: false },
    { id: 5, title: 'Planificación', color: '#FFA500', enabled: false },
  ];

  const handleModulePress = (moduleId) => {
    if (moduleId === 1) {
      navigation.navigate('Modulo');
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
      <Text style={styles.title}>Curso de Finanzas</Text>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progreso:</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '20%' }]} />
        </View>
      </View>
      <View style={styles.modulesContainer}>
        {modules.map((module, index) => (
          <React.Fragment key={module.id}>
            <TouchableOpacity
              style={[styles.moduleButton, { backgroundColor: module.color }]}
              onPress={() => handleModulePress(module.id)}
              disabled={!module.enabled}
            >
              <Text style={styles.moduleText}>{module.id}</Text>
              <Ionicons
                name={module.enabled ? 'lock-open' : 'lock-closed'}
                size={20}
                color="white"
                style={styles.lockIcon}
              />
            </TouchableOpacity>
            {index < modules.length - 1 && (
              <View style={styles.footprintsContainer}>
                {[...Array(3)].map((_, i) => (
                  <Ionicons key={i} name="footsteps" size={20} color="#000" style={styles.footprint} />
                ))}
              </View>
            )}
          </React.Fragment>
        ))}
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
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#EB0029',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 18,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EB0029',
    borderRadius: 5,
  },
  modulesContainer: {
    alignItems: 'center',
  },
  moduleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  moduleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lockIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  footprintsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  footprint: {
    marginHorizontal: 2,
  },
});

export default CourseOverview;