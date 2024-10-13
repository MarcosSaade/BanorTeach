import React from "react";
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";

import { Icon, Drawer as DrawerCustomItem } from '../components';
import { Images, materialTheme } from "../constants";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea();
  const screens = [
    "Cursos",
    "Mis Puntos",
    "Mis Metas",
    "Configuracion"
  ];

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.25} style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Profile")}
        >
          <Block style={styles.profile}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <Text h5 color={"white"}>
              {profile.name}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.4,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
        </ScrollView>
      </Block>
      
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4E4044',
    paddingHorizontal: 28,
    justifyContent: 'center',
    height: 100,
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 4,
    flexDirection: 'row',
    alignItems: 'center', 
    marginLeft: '-8%',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginRight: theme.SIZES.BASE,
  },
});


export default CustomDrawerContent;
