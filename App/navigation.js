import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import ShopDetail from "./screens/ShopDetail";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import ProductDetail from "./screens/ProductDetail";
import Cart from "./screens/Cart";
import Address from "./screens/Address";
import Payment from "./screens/Payment";
import OrdersComplete from "./screens/OrdersComplete";
import Orders from "./screens/Orders";
import LoginSuccess from "./screens/LoginSuccess";
import ContactUs from "./screens/ContactUs";
import BrowseAllProducts from "./screens/BrowseAllProducts";
import Browse from "./screens/Browse";
import BestsellerProducts from "./screens/BestsellerProducts";
import Privacy from "./screens/Privacy";
import Support from "./screens/Support";

export default function RootNavigation() {
  const { store, persistor } = configureStore();
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={screenOptions}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ShopDetail" component={ShopDetail} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Address" component={Address} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="OrdersComplete" component={OrdersComplete} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen
              name="BrowseAllProducts"
              component={BrowseAllProducts}
            />
            <Stack.Screen name="Browse" component={Browse} />
            <Stack.Screen
              name="BestsellerProducts"
              component={BestsellerProducts}
            />
            <Stack.Screen name="Privacy" component={Privacy} />
            <Stack.Screen name="Support" component={Support} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </ReduxProvider>
  );
}
