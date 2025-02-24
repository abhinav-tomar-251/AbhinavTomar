import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigation/AppNavigator';
import { GradientCard, AnimatedButton, SectionTitle } from '../components/SharedComponents';
import BlogModal from '../components/BlogModal';
import Icon from 'react-native-vector-icons/FontAwesome';

const articles = [
  {
    title: 'Building Modern React Native Apps',
    description: 'A comprehensive guide on building modern, performant React Native applications with best practices and latest features.',
    date: 'Feb 2024',
    readTime: '10 min read',
    tags: ['React Native', 'Mobile Development', 'JavaScript'],
    content: `React Native has revolutionized mobile app development by enabling developers to build native applications using JavaScript and React. In this comprehensive guide, we'll explore the best practices and latest features that make React Native a powerful choice for modern mobile development.

Key Topics Covered:
• Setting up a scalable project structure
• Implementing modern navigation patterns
• Managing state effectively
• Optimizing performance
• Handling platform-specific code
• Testing and debugging strategies

We'll also dive into practical examples and real-world scenarios to help you build better React Native applications.`,
    link: 'https://dev.to/your-username/building-modern-react-native-apps',
  },
  {
    title: 'Mastering TypeScript in React Native',
    description: 'Learn how to leverage TypeScript to write more maintainable and error-free React Native applications.',
    date: 'Jan 2024',
    readTime: '12 min read',
    tags: ['TypeScript', 'React Native', 'Development'],
    content: `TypeScript has become an essential tool in modern React Native development. This article explores how TypeScript can improve your development workflow and help catch errors before they reach production.

Topics Covered:
• TypeScript basics for React Native
• Type definitions for props and state
• Generic components
• Custom type declarations
• Integration with popular libraries
• Best practices for type safety

Through practical examples, you'll learn how to write type-safe code that's easier to maintain and refactor.`,
    link: 'https://dev.to/your-username/mastering-typescript-in-react-native',
  },
  {
    title: 'Advanced Animation Techniques in React Native',
    description: 'Explore advanced animation techniques to create smooth and engaging user experiences in React Native.',
    date: 'Dec 2023',
    readTime: '15 min read',
    tags: ['Animation', 'React Native', 'UI/UX'],
    content: `Animations are crucial for creating engaging mobile experiences. This guide covers advanced animation techniques in React Native using the Animated API and popular animation libraries.

Topics Covered:
• Understanding the Animated API
• Creating complex animations
• Gesture-based animations
• Shared element transitions
• Performance optimization
• Popular animation libraries

Learn how to create smooth, performant animations that enhance your app's user experience.`,
    link: 'https://dev.to/your-username/advanced-animation-techniques-react-native',
  },
];

type Props = BottomTabScreenProps<RootStackParamList, 'Blog'>;

const BlogScreen = ({ navigation }: Props) => {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleArticlePress = (article: typeof articles[0]) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <SectionTitle title="Technical Blog" />
      
      {articles.map((article, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleArticlePress(article)}
          activeOpacity={0.8}
        >
          <GradientCard style={styles.articleCard}>
            <View style={styles.header}>
              <Text style={styles.title}>{article.title}</Text>
              <View style={styles.metaInfo}>
                <Text style={styles.date}>{article.date}</Text>
                <Icon name="circle" size={4} color="#6366f1" style={styles.dot} />
                <Text style={styles.readTime}>{article.readTime}</Text>
              </View>
            </View>
            
            <Text style={styles.description}>{article.description}</Text>
            
            <View style={styles.tagsContainer}>
              {article.tags.map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            
            <AnimatedButton
              title="Read Article"
              onPress={() => handleArticlePress(article)}
              style={styles.readButton}
            />
          </GradientCard>
        </TouchableOpacity>
      ))}
      
      <View style={styles.writeArticle}>
        <Icon name="pencil" size={24} color="#6366f1" style={styles.writeIcon} />
        <Text style={styles.writeText}>
          Want to read more? Check out my latest articles and tutorials.
        </Text>
        <AnimatedButton
          title="View All Articles"
          onPress={() => {
            Linking.openURL('https://dev.to/your-username');
          }}
          style={styles.viewAllButton}
        />
      </View>

      {selectedArticle && (
        <BlogModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          article={selectedArticle}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  articleCard: {
    marginBottom: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: '#9ca3af',
  },
  dot: {
    marginHorizontal: 8,
  },
  readTime: {
    fontSize: 14,
    color: '#9ca3af',
  },
  description: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 16,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  readButton: {
    marginTop: 8,
  },
  writeArticle: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  writeIcon: {
    marginBottom: 16,
  },
  writeText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    width: '100%',
  },
});

export default BlogScreen;
