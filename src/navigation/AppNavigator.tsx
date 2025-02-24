import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import ExperienceScreen from '../screens/ExperienceScreen';
import BlogScreen from '../screens/BlogScreen';
import ContactScreen from '../screens/ContactScreen';

export type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  Portfolio: undefined;
  Experience: undefined;
  Blog: undefined;
  Contact: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Projects':
              iconName = 'code';
              break;
            case 'Portfolio':
              iconName = 'paint-brush';
              break;
            case 'Experience':
              iconName = 'briefcase';
              break;
            case 'Blog':
              iconName = 'pencil';
              break;
            case 'Contact':
              iconName = 'envelope';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#1f2937',
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: '#1f2937',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Experience" component={ExperienceScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
