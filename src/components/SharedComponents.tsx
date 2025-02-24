import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientCardProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

interface AnimatedButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
}

interface SectionTitleProps {
  title: string;
}

export const GradientCard: React.FC<GradientCardProps> = ({ children, style, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={['#1f2937', '#374151']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradientCard, style]}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onPress, title, style }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <LinearGradient
      colors={['#6366f1', '#4f46e5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.button, style]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const styles = StyleSheet.create({
  gradientCard: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 16,
    marginHorizontal: 16,
  },
});
