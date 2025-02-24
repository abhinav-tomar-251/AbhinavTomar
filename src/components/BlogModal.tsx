import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface BlogModalProps {
  visible: boolean;
  onClose: () => void;
  article: {
    title: string;
    date: string;
    readTime: string;
    content: string;
    tags: string[];
  };
}

const BlogModal: React.FC<BlogModalProps> = ({ visible, onClose, article }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="times" size={24} color="#fff" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{article.title}</Text>
            
            <View style={styles.metaInfo}>
              <Text style={styles.date}>{article.date}</Text>
              <Icon name="circle" size={4} color="#6366f1" style={styles.dot} />
              <Text style={styles.readTime}>{article.readTime}</Text>
            </View>

            <View style={styles.tagsContainer}>
              {article.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.content}>{article.content}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 20,
    width: Dimensions.get('window').width * 0.9,
    maxHeight: Dimensions.get('window').height * 0.8,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: -10,
    top: -10,
    zIndex: 1,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    marginTop: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
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
  content: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 24,
  },
});

export default BlogModal;
