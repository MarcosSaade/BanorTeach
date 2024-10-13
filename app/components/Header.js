import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Block, Text } from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('window');

class Header extends React.Component {
  renderTabs = () => {
    return (
      <Block row style={styles.tabs}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
        >
          <Block row middle>
            <Icon name="book" family="Galio" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Cursos</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab}>
          <Block row middle>
            <Icon name="calendar" family="Galio" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Mis Metas</Text>
          </Block>
        </Button>
      </Block>
    );
  }

  render() {
    return (
      <Block center>
        {this.renderTabs()}
      </Block>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: materialTheme.COLORS.TRANSPARENT,
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
    borderRightColor: materialTheme.COLORS.MUTED,
  },
});
