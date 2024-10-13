import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';

import Images from '../constants/Images';
import { CourseContent } from '../constants/CourseContent';

const { width } = Dimensions.get('screen');

export default class Home extends React.Component {
  renderTabs = () => {
    const { navigation } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]}>
          <Block row middle>
            <Ionicons name="book-outline" size={16} style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Cursos</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Mis Metas')}>
          <Block row middle>
            <Ionicons name="trending-up-outline" size={16} style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Mis Metas</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderContent = () => {
    const { navigation } = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <Block flex>
          {/* Course 1 */}
          <Block card style={styles.card}>
            <Text h5>{CourseContent.finanzasPersonales.title}</Text>
            <Text muted>{CourseContent.finanzasPersonales.description}</Text>
            <Image source={{ uri: Images.Courses[0] }} style={styles.image} />
            <Button
              onPress={() => this.props.navigation.navigate('Placement', { courseId: 'finanzasPersonales' })}
              color="info"
              style={styles.button}
            >
              Empieza Ahora
            </Button>
          </Block>

          {/* Course 2 */}
          <Block card style={styles.card}>
            <Text h5>{CourseContent.inversionesAhorro.title}</Text>
            <Text muted>{CourseContent.inversionesAhorro.description}</Text>
            <Image source={{ uri: Images.Courses[1] }} style={styles.image} />
            <Button
              onPress={() => navigation.navigate('Placement', { courseId: 'inversionesAhorro' })}
              color="info"
              style={styles.button}
            >
              Empieza Ahora
            </Button>
          </Block>

          {/* Course 3 */}
          <Block card style={styles.card}>
            <Text h5>{CourseContent.planificacionFinanciera.title}</Text>
            <Text muted>{CourseContent.planificacionFinanciera.description}</Text>
            <Image source={{ uri: Images.Courses[2] }} style={styles.image} />
            <Button
              onPress={() => navigation.navigate('Placement', { courseId: 'planificacionFinanciera' })}
              color="info"
              style={styles.button}
            >
              Empieza Ahora
            </Button>
          </Block>
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderTabs()}
        {this.renderContent()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  content: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    padding: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
    borderRadius: 6,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  button: {
    marginTop: theme.SIZES.BASE,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#EB0029',
  },
  image: {
    width: 300,
    height: 150,
    alignSelf: 'center',
    margin: 10,
    borderRadius: 10
  }
});
