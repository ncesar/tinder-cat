import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons, FontAwesome6, Feather } from '@expo/vector-icons';

interface BottomNavigationProps {
  activeTab: 'home' | 'chat' | 'profile';
  onTabPress: (tab: 'home' | 'chat' | 'profile') => void;
  likeCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabPress, likeCount = 0 }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'home' && styles.activeTab]}
        onPress={() => onTabPress('home')}
      >
        <MaterialCommunityIcons 
          name="paw" 
          size={24} 
          color={activeTab === 'home' ? '#EC537E' : '#434141'} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
        onPress={() => onTabPress('chat')}
      >
        <View style={styles.chatTabContainer}>
          <FontAwesome6
            name="comment" 
            size={24} 
            color={activeTab === 'chat' ? '#EC537E' : '#434141'} 
          />
          {likeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{likeCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
        onPress={() => onTabPress('profile')}
      >
        <Feather 
          name="user" 
          size={24} 
          color={activeTab === 'profile' ? '#EC537E' : '#434141'} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    justifyContent: 'space-around',
    paddingVertical: 10,
    width: 200,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    zIndex: 20,
    elevation: 20,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 25,
    elevation: 25,
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  chatTabContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
