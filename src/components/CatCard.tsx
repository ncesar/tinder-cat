import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { CatBreed } from '../types/cat';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface CatCardProps {
  cat: CatBreed;
  url: string;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, url }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: url }} style={styles.image} />
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