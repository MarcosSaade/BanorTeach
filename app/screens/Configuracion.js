import React from 'react';
import { StyleSheet, Switch, FlatList, Platform, TouchableOpacity, View } from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";

import materialTheme from '../constants/Theme';

export default class Configuracion extends React.Component {
  state = {};

  toggleSwitch = switchNumber => this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    switch(item.type) {
      case 'switch': 
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text size={14}>{item.title}</Text>
            <Switch
              onValueChange={() => this.toggleSwitch(item.id)}
              ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
              thumbColor={Platform.OS === 'android' ? materialTheme.COLORS.SWITCH_OFF : null}
              trackColor={{ false: materialTheme.COLORS.SWITCH_OFF, true: materialTheme.COLORS.SWITCH_ON }}
              value={this.state[item.id]}
            />
          </Block>
        );
      case 'button': 
        return (
          <Block style={styles.rows}>
            <TouchableOpacity>
              <Block row middle space="between" style={{paddingTop:7}}>
                <Text size={14}>{item.title}</Text>
                <Icon name="angle-right" family="font-awesome" style={{ paddingRight: 5 }} />
              </Block>
            </TouchableOpacity>
          </Block>);
      default:
        break;
    }
  }

  render() {
    const configuracionesRecomendadas = [
      { title: "Usar FaceID para iniciar sesión", id: "face", type: "switch" },
      { title: "Bloqueo automático de seguridad", id: "autolock", type: "switch" },
      { title: "Notificaciones", id: "notificaciones", type: "button" },
    ];

    const configuracionesPago = [
      { title: "Conoce nuestras tarjetas", id: "pago", type: "button" },
      { title: "Abrir una cuenta de ahorro", id: "regalo", type: "button" },
    ];
    
    const configuracionesPrivacidad = [
      { title: "Acuerdo de usuario", id: "acuerdo", type: "button" },
      { title: "Privacidad", id: "privacidad", type: "button" },
      { title: "Acerca de", id: "acerca", type: "button" },
    ];

    return (
      <View
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.Configuracion}>
        <FlatList
          data={configuracionesRecomendadas}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
          ListHeaderComponent={
            <Block style={styles.title}>
              <Text bold size={theme.SIZES.BASE} style={styles.headerText}>
                Configuraciones recomendadas
              </Text>
              <Text muted size={12} style={styles.descriptionText}>
                Ajusta las configuraciones esenciales para aprovechar BanorTeach al máximo.
              </Text>
            </Block>
          }
        />
        <Block style={styles.title}>
          <Text bold size={theme.SIZES.BASE} style={styles.headerText}>
            Configuraciones de pago
          </Text>
          <Text muted size={12} style={styles.descriptionText}>
            Administra tus opciones de pago y finanzas fácilmente.
          </Text>
        </Block>
        <FlatList
          data={configuracionesPago}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
        />
        <Block style={styles.title}>
          <Text bold size={theme.SIZES.BASE} style={styles.headerText}>
            Configuraciones de privacidad
          </Text>
          <Text muted size={12} style={styles.descriptionText}>
            Ajusta la seguridad y privacidad de tu cuenta.
          </Text>
        </Block>
        <FlatList
          data={configuracionesPrivacidad}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Configuracion: {
    paddingVertical: theme.SIZES.BASE / 3,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  },
  headerText: {
    paddingBottom: 5,
    textAlign: 'left',
    marginHorizontal: 20,
  },
  descriptionText: {
    textAlign: 'left',
    marginHorizontal: 20,
  }
});
