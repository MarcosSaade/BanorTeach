import { Animated, Dimensions, Easing } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Icon } from "../components";
import { Images, materialTheme } from "../constants";

import MetasScreen from "../screens/Metas";
import CustomDrawerContent from "./Menu";
import HomeScreen from "../screens/Cursos";
import OnboardingScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/Profile";
import ConfiguracionScreen from "../screens/Configuracion";
import PointsScreen from "../screens/Mis Puntos";
import Historia from "../screens/Historia"; // Adjust the path as needed
import Cursos from "../screens/Cursos";
import Curso from "../screens/Curso";
import PlacementScreen from "../screens/Placement"; // Import your Placement screen
import ModuloScreen from "../screens/Modulo"; // Import your Modulo screen
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import CourseProgress from "../screens/Placement";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile = {
  avatar: Images.Profile,
  name: "Valeria López",
  type: "",
  plan: "",
  rating: 22,
};

function PointsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Mis Puntos"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Mis Puntos"
        component={PointsScreen}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

function ConfiguracionStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Configuracion"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Configuracion"
        component={ConfiguracionScreen}
      />
    </Stack.Navigator>
  );
}

function MetasStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Mis Metas"
        component={MetasScreen}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Cursos" 
        component={Cursos}
      />
      <Stack.Screen
        name="Curso"
        component={Curso} 
      />
    </Stack.Navigator>
  );
}

function PlacementStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Placement"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Placement"
        component={PlacementScreen}
        // Ensure you're passing any parameters needed here
      />
    </Stack.Navigator>
  );
}

function ModuloStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Modulo"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Modulo"
        component={ModuloScreen}
        // Pass parameters from props.route.params to the Modulo screen
        initialParams={props.route.params} // Pass parameters if needed
      />
      <Stack.Screen
        name="Historia"
        component={Historia}
        // Pass the same parameters to Historia
        initialParams={props.route.params} // Pass the same parameters as Modulo
      />
    </Stack.Navigator>
  );
}


function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          justifyContent: "center",
          alignContent: "center",
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Cursos"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Mis Puntos"
        component={PointsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Mis Metas"
        component={MetasStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-switch"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Configuracion"
        component={ConfiguracionStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="gears"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: -3 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Modulo" // Add the Modulo screen here
        component={ModuloStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-document"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Placement"
        component={CourseProgress}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-checkmark-circle"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
