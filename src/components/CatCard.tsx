import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { CatBreed } from '../types/cat';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface CatCardProps {
  cat: CatBreed;
  url: string;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, url }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.card}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      )}
      <Image
        source={{ uri: url }}
        style={styles.image}
        contentFit="cover"
        transition={300}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        cachePolicy="memory-disk"
      />
      <View style={styles.overlay}>
        <View style={styles.infoBox}>
          <View style={styles.leftInfo}>
            <Text style={styles.name}>{cat.name}</Text>
            <Text style={styles.location}>{cat.origin}</Text>
            <Text style={styles.temperament}>{cat.temperament}</Text>
          </View>
          <View style={styles.rightInfo}>
            <Text style={styles.age}>{cat.life_span}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: screenHeight * 0.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    pointerEvents: 'auto',
    position: 'relative',
    zIndex: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'flex-end',
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '90%',
    height: 65,
  },
  leftInfo: {
    flex: 1,
  },
  rightInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#434141',
    marginBottom: 4,
  },
  location: {
    fontSize: 8,
    color: '#BFBFC0',
  },
  temperament: {
    fontSize: 8,
    color: '#BFBFC0',
  },
  age: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#434141',
  },
});