import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  Linking,
  Image
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const skills = [
  { name: 'React/Next.js', level: 95 },
  { name: 'JavaScript/TypeScript', level: 85 },
  { name: 'Node.js', level: 90 },
  { name: 'React Native', level: 70 },
  { name: 'SQL/NoSQL', level: 85 },
];

const socialLinks = [
  { icon: 'github', url: 'https://github.com/abhinav-tomar-251' },
  { icon: 'linkedin', url: 'https://in.linkedin.com/in/abhinavtomarcolancer' },
  { icon: 'twitter', url: 'https://twitter.com/abhinavtomar251' },
];

const contactInfo = {
  email: 'abhinavtomar251@gmail.com',
  phone: '+91 9977231250',
  location: 'Indore, India',
};

// WavingHand component
const WavingHand = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
    return () => rotateAnim.setValue(0);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '30deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }], flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>👋</Text>
    </Animated.View>
  );
};

type Props = BottomTabScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const avatarScale = useRef(new Animated.Value(0.5)).current;
  const skillAnims = useRef(skills.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(avatarScale, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      ...skillAnims.map((anim, index) => 
        Animated.timing(anim, {
          toValue: 1,
          duration: 1000,
          delay: 200 + index * 100,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
        <SafeAreaView style={styles.container}>
          <Animated.View  style={styles.content}>
            {/* Header Section */}
              <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.greeting}>
                  <WavingHand />
                  <Text style={styles.greetingText}>Hi, I'm</Text>
                </View>
                <Text style={styles.name}>Abhinav Tomar</Text>
                <Text style={styles.title}>Full Stack Developer</Text>
                <Text style={styles.subtitleText}>Building beautiful & performant web & mobile apps</Text>
              </Animated.View>

            {/* Avatar Section */}
            <Animated.View style={[styles.avatarContainer, { transform: [{ scale: avatarScale }] }]}>
              <Image
                source={require('../../assets/avatar.jpg')}
                style={styles.avatar}
              />
            </Animated.View>

            {/* About Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text style={styles.bio}>
                I'm a passionate Full Stack Developer with expertise in modern web and mobile technologies.
                I love creating beautiful, responsive, and user-friendly applications.
              </Text>
            </View>

            {/* Skills Section */}
            <View style={styles.skillsSection}>
              <Text style={styles.sectionTitle}>Technical Skills</Text>
              {skills.map((skill, index) => (
                <View key={skill.name} style={styles.skillContainer}>
                  <View style={styles.skillInfo}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <Text style={styles.skillLevel}>{skill.level}%</Text>
                  </View>
                  <View style={styles.progressBackground}>
                    <Animated.View
                      style={[
                        styles.progressFill,
                        {
                          width: `${skill.level}%`,
                          transform: [{ scaleX: skillAnims[index] }],
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>

            {/* Social Links */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Let's Connect</Text>
              <View style={styles.socialLinks}>
                {socialLinks.map((link) => (
                  <TouchableOpacity
                    key={link.icon}
                    style={styles.socialButton}
                    onPress={() => Linking.openURL(link.url)}
                  >
                    <Icon name={link.icon} size={24} color="#fff" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Contact Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact</Text>
              <View style={styles.contactInfo}>
                <View style={styles.contactItem}>
                  <Icon name="envelope" size={20} color="#6366f1" />
                  <Text style={styles.contactText}>{contactInfo.email}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Icon name="phone" size={20} color="#6366f1" />
                  <Text style={styles.contactText}>{contactInfo.phone}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Icon name="map-marker" size={20} color="#6366f1" />
                  <Text style={styles.contactText}>{contactInfo.location}</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    minHeight: '100%',
    padding: 20,
    backgroundColor: '#111827',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 28,
    color: '#f3f4f6',
    fontWeight: '300',
    marginBottom: 10,
    fontFamily: 'Inter-SemiBold',
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 5,
    fontFamily: 'Inter-Bold',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    fontSize: 20,
    color: '#6366f1',
    fontFamily: 'Inter-Medium',
  },
  subtitleText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
    borderWidth: 3,
    borderColor: '#6366f1',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  section: {
    width: width - 40,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9fafb',
    marginBottom: 20,
    fontFamily: 'Inter-Bold',
  },
  skillsSection: {
    width: width - 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
  },
  bio: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  skillContainer: {
    marginBottom: 15,
  },
  skillInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: {
    color: '#f3f4f6',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  skillLevel: {
    color: '#6366f1',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  progressBackground: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    gap: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactText: {
    color: '#e5e7eb',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});


export default HomeScreen;
