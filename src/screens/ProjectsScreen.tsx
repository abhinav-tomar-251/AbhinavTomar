import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Linking,
  Image,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigation/AppNavigator';
import { GradientCard, AnimatedButton, SectionTitle } from '../components/SharedComponents';

type Props = BottomTabScreenProps<RootStackParamList, 'Projects'>;

const projects = [
  {
    name: 'Board Buddy',
    description: 'A real-time collaboration platform that enables users to create organizations and work on projects seamlessly. Features include real-time task management, project tracking, and upcoming group chat functionality.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Real-time Updates', 'WebSocket'],
    link: 'https://github.com/abhinav-tomar-251/my_board',
  },
  {
    name: 'ConverseSync',
    description: 'A full-stack real-time chat application with secure authentication, profile customization, and group chat capabilities. Supports text messaging and image sharing with lightning-fast communication.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Pusher', 'Socket.io'],
    link: 'https://github.com/abhinav-tomar-251/converse-sync',
  },
  {
    name: 'Profia-Portfolio Generator',
    description: 'A dynamic portfolio generator that creates fully responsive static websites through a simple form interface. Users can preview changes in real-time and download customizable HTML code.',
    technologies: ['React', 'Node.js', 'SCSS', 'Bootstrap', 'JavaScript'],
    link: 'https://github.com/abhinav-tomar-251/Profia-Portfolio-Generator',
  },
  {
    name: 'Razorpay Clone',
    description: 'A pixel-perfect UI clone of the Razorpay homepage, demonstrating attention to detail and frontend development skills.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    link: 'https://github.com/abhinav-tomar-251/razorpay-clone',
  },
  {
    name: 'Midnight Crafts',
    description: 'A digital art portfolio showcasing intricate black art and pen illustrations, created during the nocturnal hours. Features a collection of unique artistic works and creative designs.',
    technologies: ['Digital Art', 'Illustration', 'Design'],
    link: 'https://www.behance.net/gallery/167267567/Midnight-Crafts',
  },
];

const ProjectsScreen: React.FC<Props> = ({ navigation }: Props) => {
  return (
    <ScrollView style={styles.container}>
      <SectionTitle title="My Projects" />
      
      {projects.map((project, index) => (
        <GradientCard key={index} style={styles.projectCard}>
          <Text style={styles.projectTitle}>{project.name}</Text>
          <Text style={styles.description}>{project.description}</Text>
          
          <View style={styles.techContainer}>
            {project.technologies.map((tech, techIndex) => (
              <View key={techIndex} style={styles.techBadge}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </View>
          
          <AnimatedButton
            title="View on GitHub"
            onPress={() => Linking.openURL(project.link)}
            style={styles.viewButton}
          />
        </GradientCard>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  projectCard: {
    marginBottom: 16,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 12,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
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
  viewButton: {
    marginTop: 8,
  },
});

export default ProjectsScreen;
