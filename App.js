import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import IssLocation from "./screens/IssLocation";
import Meteor from "./screens/Meteor";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                intialRouteName="home"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="home" component={HomeScreen}></Stack.Screen>
                <Stack.Screen name="iss" component={IssLocation}></Stack.Screen>
                <Stack.Screen name="meteor" component={Meteor}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
