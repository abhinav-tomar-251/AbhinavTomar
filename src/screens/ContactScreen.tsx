import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigation/AppNavigator';
import { GradientCard, AnimatedButton, SectionTitle } from '../components/SharedComponents';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = BottomTabScreenProps<RootStackParamList, 'Contact'>;

const ContactScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const contactMethods = [
    {
      icon: 'envelope',
      label: 'Email',
      value: 'abhinavtomar251@gmail.com',
      action: () => Linking.openURL('mailto:abhinavtomar251@gmail.com'),
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+91 9977231250',
      action: () => Linking.openURL('tel:+919977231250'),
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'abhinavtomarcolancer',
      action: () => Linking.openURL('https://in.linkedin.com/in/abhinavtomarcolancer'),
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'abhinav-tomar-251',
      action: () => Linking.openURL('https://github.com/abhinav-tomar-251'),
    },
  ];

  const handleSubmit = () => {
    // Implement your contact form submission logic here
    const emailBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    Linking.openURL(`mailto:abhinavtomar251@gmail.com?subject=Portfolio Contact&body=${encodeURIComponent(emailBody)}`);
  };

  return (
    <ScrollView style={styles.container}>
      <SectionTitle title="Get in Touch" />
      
      <View style={styles.contactMethodsContainer}>
        {contactMethods.map((method, index) => (
          <GradientCard key={index} style={styles.contactMethodCard}>
            <TouchableOpacity onPress={method.action} style={styles.contactMethod}>
              <Icon name={method.icon} size={24} color="#6366f1" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>{method.label}</Text>
                <Text style={styles.contactValue}>{method.value}</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#6366f1" />
            </TouchableOpacity>
          </GradientCard>
        ))}
      </View>

      <GradientCard style={styles.formCard}>
        <Text style={styles.formTitle}>Send me a message</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#9ca3af"
            placeholder="Your name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#9ca3af"
            placeholder="Your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            value={message}
            onChangeText={setMessage}
            placeholderTextColor="#9ca3af"
            placeholder="Your message"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <AnimatedButton
          title="Send Message"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </GradientCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  contactMethodsContainer: {
    marginBottom: 24,
  },
  contactMethodCard: {
    marginBottom: 12,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  contactValue: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  formCard: {
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 16 : 12,
    color: '#fff',
    fontSize: 16,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 24,
  },
});

export default ContactScreen;
