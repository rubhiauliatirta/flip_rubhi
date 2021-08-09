/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from './src/screens/Detail';
import TransactionList from './src/screens/TransactionList';
import store from './src/store';

const { Navigator, Screen } = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="TransactionList" component={TransactionList} />
          <Screen name="Detail" component={Detail} />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
