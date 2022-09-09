import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductContainer from "../Screens/Products/ProductContainer";
import ProductDetails from "../Screens/Products/ProductDetails";
import CartScreen from "../Screens/Cart/CartScreen";

const Stack = createNativeStackNavigator();

function CartNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CartDetails"
        component={CartScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default CartNavigator;
