import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Main from '~/pages/Main';
import AddTruck from '~/pages/AddTruck';
import Truck from '~/pages/Truck';
import TruckSpents from '~/pages/TruckSpents';
import TruckProfits from '~/pages/TruckProfits';
import AddNewProfit from '~/pages/AddNewProfit';
import EditProfit from '~/pages/EditProfit';
import AddNewSpent from '~/pages/AddNewSpent';
import EditSpent from '~/pages/EditSpent';
import PDFView from '~/pages/PDFView';

const Tab = createBottomTabNavigator();

// eslint-disable-next-line react/prop-types
function TabRoutes({ route }) {
  return (
    <Tab.Navigator
      initialRouteName="Truck"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#eee',
        inactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        style: {
          height: 60,
          padding: 10,
          paddingBottom: 10,
          backgroundColor: '#15a',
        },
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Truck"
        component={Truck}
        // eslint-disable-next-line react/prop-types
        initialParams={{ id: route.params.id }}
        options={{
          tabBarLabel: 'Caminhão',
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="truck" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TruckSpents"
        component={TruckSpents}
        // eslint-disable-next-line react/prop-types
        initialParams={{ id: route.params.id }}
        options={{
          tabBarLabel: 'Gastos',
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="money-off" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TruckProfits"
        component={TruckProfits}
        // eslint-disable-next-line react/prop-types
        initialParams={{ id: route.params.id }}
        options={{
          tabBarLabel: 'Lucros',
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTransparent: true,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="AddTruck"
        component={AddTruck}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={25} color="#eee" />
            </TouchableOpacity>
          ),
          title: 'Adicionar Novo Caminhão',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTransparent: false,
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#15a',
            height: 60,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#eee',
          },
        })}
      />
      <Stack.Screen
        name="Truck"
        component={TabRoutes}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={25} color="#eee" />
            </TouchableOpacity>
          ),
          title: '',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTransparent: true,
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="AddNewProfit"
        component={AddNewProfit}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={25} color="#eee" />
            </TouchableOpacity>
          ),
          title: 'Adicionar novo Lucro',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTransparent: false,
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#15a',
            height: 60,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#eee',
          },
        })}
      />
      <Stack.Screen
        name="EditProfit"
        component={EditProfit}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={25} color="#eee" />
            </TouchableOpacity>
          ),
          title: 'Editar Lucro',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTransparent: false,
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#15a',
            height: 60,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#eee',
          },
        })}
      />
      <Stack.Screen
        name="AddNewSpent"
        component={AddNewSpent}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={25} color="#eee" />
            </TouchableOpacity>
          ),
          title: 'Adicionar novo Gasto',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTransparent: false,
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#15a',
            height: 60,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#eee',
          },
        })}
      />
      <Stack.Screen
        name="EditSpent"
        component={EditSpent}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={25} color="#eee" />
            </TouchableOpacity>
          ),
          title: 'Editar Gasto',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTransparent: false,
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#15a',
            height: 60,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#eee',
          },
        })}
      />
      <Stack.Screen
        name="PDFView"
        component={PDFView}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={25} color="#eee" />
            </TouchableOpacity>
          ),
          title: '',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTransparent: true,
          gestureEnabled: true,
        })}
      />
    </Stack.Navigator>
  );
}

function Routes() {
  return (
    <NavigationContainer>
      <StackRoutes />
      {/* <TabRoutes /> */}
    </NavigationContainer>
  );
}

export default Routes;
