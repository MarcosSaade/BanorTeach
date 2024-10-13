import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('screen');

// Color of the points card
const pointsCardColor = '#EB0029';

const RewardsProgress = ({ title, current, target }) => (
  <Block style={styles.progressBlock}>
    <Text size={14} style={styles.progressTitle}>{title}</Text>
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${(current / target) * 100}%`, backgroundColor: pointsCardColor }]} />
    </View>
    <Text size={12} color={theme.COLORS.MUTED}>{`${current} / ${target} puntos`}</Text>
  </Block>
);

export default function BanorteRewards() {
  const userPoints = 7500;

  const rewards = [
    { title: 'Cuenta de ahorros nueva', current: 7500, target: 10000 },
    { title: 'Tarjeta de crédito sin anualidad', current: 7500, target: 15000 },
    { title: 'Bono en efectivo', current: 7500, target: 20000 },
  ];

  return (
    <Block flex center style={styles.container}>
      <Block style={styles.header}>
        <Ionicons name="star" size={24} color={theme.COLORS.WARNING} />
        <Text h4 style={styles.headerText}>Mis Recompensas Banorte</Text>
      </Block>

      <LinearGradient
        colors={['#EB0029', '#EE3F31']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.pointsCard}
      >
        <Block style={styles.pointsCardContent}>
          <Text h3 style={styles.pointsText}>{userPoints.toLocaleString()}</Text>
          <Text size={16} color={theme.COLORS.WHITE}>Puntos disponibles</Text>
        </Block>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Block flex>
          <Text h5 style={styles.sectionTitle}>Progreso hacia recompensas</Text>
          {rewards.map((reward, index) => (
            <RewardsProgress key={index} {...reward} />
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: theme.COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE,
  },
  headerText: {
    marginLeft: theme.SIZES.BASE,
    color: theme.COLORS.DEFAULT,
  },
  pointsCard: {
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 4,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  pointsCardContent: {
    padding: theme.SIZES.BASE * 2,
    alignItems: 'center',
  },
  pointsText: {
    color: theme.COLORS.WHITE,
    fontWeight: 'bold',
  },
  content: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  sectionTitle: {
    marginBottom: theme.SIZES.BASE,
  },
  progressBlock: {
    marginBottom: theme.SIZES.BASE,
  },
  progressTitle: {
    marginBottom: 5,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: theme.COLORS.GREY,
    borderRadius: 5,
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
});
