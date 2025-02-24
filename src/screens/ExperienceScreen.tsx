import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Linking,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigation/AppNavigator';
import { GradientCard, AnimatedButton, SectionTitle } from '../components/SharedComponents';
import Icon from 'react-native-vector-icons/FontAwesome';

const experiences = [
  {
    company: 'MindRuby Technologies',
    role: 'Software Engineer',
    period: 'May 2022 - Present',
    location: 'Indore, Madhya Pradesh, India',
    description: 'Working as a Software Engineer focusing on full-stack development and modern web technologies.',
    responsibilities: [
      'Developing and maintaining web applications using modern frameworks',
      'Implementing responsive designs and user interfaces',
      'Collaborating with cross-functional teams',
      'Optimizing application performance and scalability',
      'Conducting code reviews and providing technical feedback'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Node.js', 'Database Management'],
  },
  {
    company: 'CoConnexion',
    role: 'Freelance Web Developer',
    period: 'Jan 2023 - May 2023',
    location: 'Indore, Madhya Pradesh, India',
    description: 'Worked as a freelance developer delivering custom web solutions for clients.',
    responsibilities: [
      'Developing custom web applications for clients',
      'Managing end-to-end project development lifecycle',
      'Implementing responsive and modern UI designs',
      'Ensuring high-quality code delivery'
    ],
    technologies: ['React', 'JavaScript', 'CSS', 'Responsive Design'],
  },
  {
    company: 'Botmartz IT Solutions',
    role: 'Full Stack Developer',
    period: 'Nov 2021 - May 2022',
    location: 'Indore, Madhya Pradesh, India',
    description: 'Led the development of a SaaS-based Admin Dashboard with comprehensive features.',
    responsibilities: [
      'Developed SaaS-based Admin Dashboard from scratch',
      'Implemented User Management and Database Management features',
      'Enhanced application speed and scalability',
      'Collaborated with design team and backend developers',
      'Conducted code reviews and provided feedback',
      'Stayed updated with latest frontend technologies'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'User Management', 'Database Management'],
  },
  {
    company: 'Botmartz IT Solutions',
    role: 'Frontend Developer',
    period: 'Aug 2021 - Nov 2021',
    location: 'Indore, Madhya Pradesh, India',
    description: 'Initiated work on the SaaS-based Admin Dashboard focusing on frontend development.',
    responsibilities: [
      'Collaborated on SaaS-based Admin Dashboard development',
      'Built frontend components using modern frameworks',
      'Implemented admin control features',
      'Optimized application performance',
      'Worked closely with backend team for integration'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
  },
];

type Props = BottomTabScreenProps<RootStackParamList, 'Experience'>;

const ExperienceScreen = ({ navigation }: Props) => {
  return (
    <ScrollView style={styles.container}>
      <SectionTitle title="Professional Experience" />
      
      {experiences.map((exp, index) => (
        <GradientCard key={index} style={styles.experienceCard}>
          <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
              <View>
                  <Text style={styles.company}>{exp.company}</Text>
                  <View>
                      <Text style={styles.role}>{exp.role}</Text>
                      <Text style={styles.period}>{exp.period}</Text>
                  </View>
                  <Text style={styles.location}>{exp.location}</Text>
              </View>
          </View>
          
          <Text style={styles.description}>{exp.description}</Text>
          
          <View style={styles.responsibilitiesContainer}>
            <Text style={styles.sectionSubtitle}>Key Responsibilities:</Text>
            {exp.responsibilities.map((resp, respIndex) => (
              <View key={respIndex} style={styles.bulletPoint}>
                <Icon name="circle" size={8} color="#6366f1" style={styles.bullet} />
                <Text style={styles.responsibilityText}>{resp}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.techContainer}>
            <Text style={styles.sectionSubtitle}>Technologies:</Text>
            <View style={styles.techList}>
              {exp.technologies.map((tech, techIndex) => (
                <View key={techIndex} style={styles.techBadge}>
                  <Text style={styles.techText}>{tech}</Text>
                </View>
              ))}
            </View>
          </View>
        </GradientCard>
      ))}
      
      <View style={styles.linkedinPromo}>
        <AnimatedButton
          title="View LinkedIn Profile"
          onPress={() => Linking.openURL('https://in.linkedin.com/in/abhinavtomarcolancer')}
          style={styles.linkedinButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  experienceCard: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  company: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  role: {
    fontSize: 16,
    color: '#6366f1',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  period: {
    fontSize: 14,
    color: '#9ca3af',
  },
  description: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 16,
  },
  responsibilitiesContainer: {
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    marginRight: 8,
  },
  responsibilityText: {
    fontSize: 14,
    color: '#9ca3af',
    flex: 1,
  },
  techContainer: {
    marginTop: 8,
  },
  techList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  techBadge: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  techText: {
    color: '#fff',
    fontSize: 14,
  },
  linkedinPromo: {
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  linkedinButton: {
    width: '100%',
  },
});

export default ExperienceScreen;
