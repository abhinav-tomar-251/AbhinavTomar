import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  TouchableOpacity,
  Platform
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigation/AppNavigator';
import { GradientCard, AnimatedButton, SectionTitle } from '../components/SharedComponents';
import Icon from 'react-native-vector-icons/FontAwesome';
import ArtViewModal from '../components/ArtViewModal';

const { width } = Dimensions.get('window');

const artworks = [
  {
    title: 'Reflections in the Eye',
    description: 'A haunting pen illustration capturing a moment of introspection, where a solitary figure is reflected in a detailed eye study, representing the window to inner depths.',
    image: require('../assets/eye_reflection.png'),
    tags: ['Black Pen', 'Eye Study', 'Reflection'],
    date: 'February 2024',
  },
  {
    title: 'Melting Shadows',
    description: 'An abstract exploration of human form dissolving into dripping shadows, created with precise ink work to convey the fluidity between solid and void.',
    image: require('../assets/melting_figure.png'),
    tags: ['Dark Art', 'Abstract', 'Ink Work'],
    date: 'January 2024',
  },
  {
    title: 'Spiral of Consciousness',
    description: 'An intricate spiral composition merging organic forms with mechanical precision, exploring the complexity of human consciousness through detailed linework.',
    image: require('../assets/spiral_eye.png'),
    tags: ['Detail Work', 'Spiral', 'Surreal'],
    date: 'November 2023',
  },
  {
    title: 'Mountain Serenity',
    description: 'A geometric interpretation of mountain landscapes enclosed in a triangle, featuring silhouetted pine trees and soaring birds against a textured backdrop.',
    image: require('../assets/geomatric_mountain.png'),
    tags: ['Geometric', 'Nature', 'Minimalist'],
    date: 'December 2023',
  },
  {
    title: 'Crimson Scream',
    description: 'A powerful expression of raw emotion rendered in black ink and crimson highlights, capturing the intensity of an existential moment.',
    image: require('../assets/red_scream.png'),
    tags: ['Mixed Media', 'Expression', 'Red Ink'],
    date: 'October 2023',
  },
  {
    title: 'Moonlit Solitude',
    description: 'A solitary figure contemplating existence against a vast moonlit cityscape, rendered in precise pen strokes to create a sense of peaceful isolation.',
    image: require('../assets/midnight_visions.png'),
    tags: ['Night Scene', 'Silhouette', 'Urban'],
    date: 'September 2023',
  },
  {
    title: 'Dark Persona',
    description: 'A stylized portrait merging human features with surreal elements, exploring the duality of identity through intricate pen work.',
    image: require('../assets/dark_portrait.png'),
    tags: ['Portrait', 'Surreal', 'Identity'],
    date: 'August 2023',
  },
  {
    title: 'Portrait Study',
    description: 'A detailed pen sketch capturing the essence of character through careful cross-hatching and dynamic line work.',
    image: require('../assets/pen_portrait.png'),
    tags: ['Portrait', 'Sketch', 'Cross-hatching'],
    date: 'July 2023',
  },
  {
    title: 'Ethereal Entity',
    description: 'A mysterious figure emerging from darkness, created with layered ink techniques to achieve a haunting atmospheric effect.',
    image: require('../assets/scream.png'),
    tags: ['Dark Art', 'Atmospheric', 'Figure'],
    date: 'June 2023',
  },
  {
    title: 'Chaotic Mind',
    description: 'An abstract representation of mental turbulence, expressed through spontaneous line work and controlled chaos.',
    image: require('../assets/chaos_mind.png'),
    tags: ['Abstract', 'Expression', 'Movement'],
    date: 'May 2023',
  }
];

type Props = BottomTabScreenProps<RootStackParamList, 'Portfolio'>;

const PortfolioScreen = ({ navigation }: Props) => {
  const [selectedArt, setSelectedArt] = useState<{
    title: string;
    date: string;
    description: string;
    image: any;
    tags: string[];
} | null>(null);

  const openArtModal = (artwork: any) => {
    setSelectedArt(artwork);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <SectionTitle title="Midnight Crafts" />
        
        <View style={styles.artistStatement}>
          <Icon name="moon-o" size={24} color="#6366f1" style={styles.moonIcon} />
          <Text style={styles.statementText}>
            An artistic journey through the depths of night, where intricate pen strokes come alive 
            to tell stories of darkness and light. Each piece is crafted in the quiet hours, 
            when creativity flows most freely.
          </Text>
        </View>

        {artworks.map((artwork, index) => (
          <GradientCard key={index} 
            style={styles.artworkCard}
            onPress={() => openArtModal(artwork)}
          >
            <Text style={styles.artworkTitle}>{artwork.title}</Text>
            <Text style={styles.date}>{artwork.date}</Text>
            
            <View style={styles.imageContainer}>
              <Image
                source={artwork.image}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.description}>{artwork.description}</Text>
            
            <View style={styles.tagsContainer}>
              {artwork.tags.map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </GradientCard>
        ))}
        
        <View style={styles.behancePromo}>
          <Icon name="behance" size={32} color="#6366f1" style={styles.behanceIcon} />
          <Text style={styles.promoText}>
            Explore more of my nocturnal artistry on Behance
          </Text>
          <AnimatedButton
            title="View Full Collection"
            onPress={() => Linking.openURL('https://www.behance.net/abhinavtomar2')}
            style={styles.behanceButton}
          />
        </View>
      </ScrollView>
      {selectedArt && (
        <ArtViewModal 
          artwork={selectedArt || { title: '', date: '', description: '', image: null, tags: [] }} 
          visible={selectedArt !== null} 
          onClose={() => setSelectedArt(null)} 
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  artistStatement: {
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  moonIcon: {
    marginBottom: 12,
  },
  statementText: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  artworkCard: {
    marginBottom: 20,
  },
  artworkTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#6366f1',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#9ca3af',
    marginVertical: 12,
    lineHeight: 24,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
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
  behancePromo: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  behanceIcon: {
    marginBottom: 16,
  },
  promoText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  behanceButton: {
    width: width - 64,
  },
});

export default PortfolioScreen;
