import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import ProductContainer from "./Screens/Products/ProductContainer";
import Header from "./Shared/Header";
import Main from "./Navigation/Main";

const App = () => {
  return (
    <NavigationContainer>
      <Header />
      <Main />
      {/* <ProductContainer /> */}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
