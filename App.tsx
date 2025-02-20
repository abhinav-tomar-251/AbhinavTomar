import React, { useState } from 'react';
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
  Modal,
  Image,
  Platform,
} from 'react-native';
import { useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const skills = [
  { name: 'React/Next.js', level: 95 },
  { name: 'JavaScript/TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'React Native', level: 75 },
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

function App() {
  const [isContactModalVisible, setContactModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const avatarScale = useRef(new Animated.Value(0.5)).current;
  const skillAnims = useRef(skills.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.sequence([
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
      Animated.stagger(200, skillAnims.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        })
      )),
    ]).start();
  }, []);

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const ContactModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isContactModalVisible}
      onRequestClose={() => setContactModalVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setContactModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Let's Connect! 🤝</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setContactModalVisible(false)}
              >
                <Icon name="times" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.contactItemsContainer}>
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={() => Linking.openURL(`mailto:${contactInfo.email}`)}
              >
                <View style={styles.contactIconContainer}>
                  <Icon name="envelope" size={20} color="#fdbb2d" />
                </View>
                <Text style={styles.contactText}>{contactInfo.email}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.contactItem}
                onPress={() => Linking.openURL(`tel:${contactInfo.phone}`)}
              >
                <View style={styles.contactIconContainer}>
                  <Icon name="phone" size={20} color="#fdbb2d" />
                </View>
                <Text style={styles.contactText}>{contactInfo.phone}</Text>
              </TouchableOpacity>

              <View style={styles.contactItem}>
                <View style={styles.contactIconContainer}>
                  <Icon name="map-marker" size={20} color="#fdbb2d" />
                </View>
                <Text style={styles.contactText}>{contactInfo.location}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.resumeButton}
              onPress={() => {
                setContactModalVisible(false);
                // Add your resume download/view logic here
              }}
            >
              <Icon name="file-text" size={20} color="#1a2a6c" style={styles.resumeIcon} />
              <Text style={styles.resumeButtonText}>View Resume</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <LinearGradient
        colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
        style={styles.container}
      >
        <SafeAreaView>
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            <Animated.View
              style={[
                styles.headerContainer,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              <Text style={styles.welcomeText}>Hello, World! 👋</Text>
              <Text style={[styles.nameText, { textAlign: 'center' }]}>I'm Abhinav Tomar</Text>
              
              <Animated.View style={[styles.avatarContainer, { transform: [{ scale: avatarScale }] }]}>
                <Image
                  source={require('./assets/avatar.jpg')}
                  style={styles.avatar}
                />
              </Animated.View>
              
              <Text style={styles.roleText}>Fullstack Developer</Text>
              <Text style={styles.subtitleText}>Building beautiful & performant web & mobile apps</Text>
            </Animated.View>

            <View style={styles.socialContainer}>
              {socialLinks.map((link, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => openLink(link.url)}
                  style={styles.socialButton}
                >
                  <Icon name={link.icon} size={24} color="#fff" />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Technical Skills</Text>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <View style={styles.skillHeader}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <Text style={styles.skillLevel}>{skill.level}%</Text>
                  </View>
                  <View style={styles.progressBackground}>
                    <Animated.View
                      style={[
                        styles.progressBar,
                        {
                          transform: [{
                            scaleX: skillAnims[index].interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, skill.level / 100],
                            })
                          }],
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => setContactModalVisible(true)}
            >
              <Text style={styles.contactButtonText}>Get In Touch</Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
      <ContactModal />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    minHeight: '100%',
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  roleText: {
    fontSize: 24,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillsContainer: {
    width: width - 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
  },
  skillsTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  skillItem: {
    marginBottom: 15,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  skillName: {
    color: '#fff',
    fontSize: 16,
  },
  skillLevel: {
    color: '#fdbb2d',
    fontSize: 16,
  },
  progressBackground: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fdbb2d',
    width: '100%',
    transform: [{ scaleX: 0 }],
    transformOrigin: 'left',
  },
  contactButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  contactButtonText: {
    color: '#1a2a6c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - 40,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalContent: {
    padding: 25,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    gap: 10,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  closeButton: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactItemsContainer: {
    marginBottom: 25,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  resumeButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  resumeIcon: {
    marginRight: 10,
  },
  resumeButtonText: {
    color: '#1a2a6c',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;