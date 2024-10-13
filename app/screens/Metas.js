import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

renderTabs = () => {
  const { navigation } = this.props;

  return (
    <Block row style={styles.tabs}>
      <TouchableOpacity style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Cursos')}>
        <Block row middle>
          <Ionicons name="book-outline" size={16} style={{ paddingRight: 8 }} />
          <Text size={16} style={styles.tabTitle}>Cursos</Text>
        </Block>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Mis Metas')}>
        <Block row middle>
          <Ionicons name="trending-up-outline" size={16} style={{ paddingRight: 8 }} />
          <Text size={16} style={styles.tabTitle}>Mis Metas</Text>
        </Block>
      </TouchableOpacity>
    </Block>
  )
}

const Metas = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [MetasList, setMetasList] = useState([]);

  const addGoalHandler = () => {
    if (title.trim() && amount.trim()) {
      setMetasList((currentMetas) => [
        ...currentMetas,
        {
          id: Math.random().toString(),
          title,
          amount: parseFloat(amount),
          dueDate,
          progress: 0,
        },
      ]);
      setTitle('');
      setAmount('');
      setShowDatePicker(false);
      setDueDate(new Date());
    }
  };

  const deleteGoalHandler = (goalId) => {
    setMetasList((currentMetas) => currentMetas.filter((goal) => goal.id !== goalId));
  };

  const updateProgressHandler = (goalId, progress) => {
    setMetasList((currentMetas) =>
      currentMetas.map((goal) =>
        goal.id === goalId ? { ...goal, progress: parseFloat(progress) } : goal
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metas Financieras</Text>
      <TextInput
        placeholder="Título de la meta"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Cantidad de la meta"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>Seleccionar Fecha de Vencimiento</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setDueDate(date);
          }}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={addGoalHandler}>
        <Text style={styles.buttonText}>Agregar Meta</Text>
      </TouchableOpacity>

      <FlatList
        data={MetasList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text>{item.title}</Text>
            <Text>Cantidad: ${item.amount}</Text>
            <Text>Fecha de Vencimiento: {item.dueDate.toLocaleDateString()}</Text>
            <Text>Progreso: {item.progress} / {item.amount}</Text>
            <TextInput
              placeholder="Actualizar Progreso"
              keyboardType="numeric"
              style={styles.progressInput}
              onChangeText={(progress) => updateProgressHandler(item.id, progress)}
            />
            <TouchableOpacity style={styles.button} onPress={() => deleteGoalHandler(item.id)}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  progressInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: '60%',
    backgroundColor: '#fff',
  },
  goalItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#EB0029',
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Metas;
