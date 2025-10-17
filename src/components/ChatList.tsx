import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { LikedCatBreed } from '../types/cat';

interface ChatListProps {
  likedCats: LikedCatBreed[];
}

export const ChatList: React.FC<ChatListProps> = ({ likedCats }) => {

  const renderCatItem = ({ item }: { item: LikedCatBreed }) => (
    <View style={styles.catItem}>
      <Image 
        source={{ uri: item.urlImage }} 
        style={styles.catAvatar}
      />
      <View style={styles.catInfo}>
        <Text style={styles.catName}>{item.name}</Text>
        <Text style={styles.catOrigin}>{item.origin}</Text>
      </View>
      <View style={styles.likeIndicator}>
        <Text style={styles.likeText}>❤️</Text>
      </View>
    </View>
  );

  if (likedCats.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No matches yet! 😿</Text>
        <Text style={styles.emptySubtitle}>
          Start swiping right on cats you like to see them here!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Your Matches ({likedCats.length})</Text>
      <FlatList
        data={likedCats}
        keyExtractor={(item) => item.id}
        renderItem={renderCatItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#434141',
    width: '100%',
    paddingHorizontal: 70,
    paddingVertical: 15,
    marginTop: 35,
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    paddingBottom: 20,
  },
  catItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    alignItems: 'center',
  },
  catAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  catInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  catName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#434141',
    marginBottom: 4,
  },
  catOrigin: {
    fontSize: 14,
    color: '#666',
  },
  likeIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeText: {
    fontSize: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#434141',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
