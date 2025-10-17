import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

interface ActionButtonsProps {
  onDislike?: () => void;
  onLike?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onDislike, onLike }) => {
  return (
    <View style={styles.actionButtons}>
      <TouchableOpacity style={styles.actionButton} onPress={onDislike}>
        <Feather 
          name="x" 
          size={38} 
          color='#E16359'
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={onLike}>
        <MaterialCommunityIcons 
          name="heart" 
          size={38} 
          color='#6BD88E'
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 60,
    zIndex: 20,
    elevation: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 25,
    elevation: 25,
  },
});
