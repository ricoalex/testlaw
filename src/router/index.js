import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Movie} from '../pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const MainApp = () => {
//   return (
//     <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
//       <Tab.Screen name="Latest" component={Home} />
//       <Tab.Screen name="Video" component={Order} />
//       <Tab.Screen name="Racing" component={Profile} />
//       <Tab.Screen name="Standings" component={Profile} />
//       <Tab.Screen name="More" component={Profile} />
//     </Tab.Navigator>
//   );
// };

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Movie"
        component={Movie}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
