import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import ListProductScreen from "../screens/ListProductScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          //   title: "My home",
          //   headerStyle: {
          //     backgroundColor: "#f4511e",
          //   },
          //   headerTintColor: "#fff",
          //   headerTitleStyle: {
          //     fontWeight: "bold",
          //   },
        }}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="List" component={ListProductScreen} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
