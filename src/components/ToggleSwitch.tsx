import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { FireIcon, FireIconGray } from '../utils/svgIcons';
import { FontAwesome } from '@expo/vector-icons';

interface ToggleSwitchProps {
  isLeftActive: boolean;
  onToggle: (isLeft: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isLeftActive, onToggle }) => {
  const thumbPosition = React.useRef(new Animated.Value(isLeftActive ? 0 : 1)).current;

  React.useEffect(() => {
    Animated.timing(thumbPosition, {
      toValue: isLeftActive ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isLeftActive]);

  const thumbTranslateX = thumbPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 50],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.track}
        onPress={() => onToggle(!isLeftActive)}
        activeOpacity={0.8}
      >
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <SvgXml xml={FireIconGray} width={16} height={16} />
          </View>
          <View style={styles.icon}>
            <FontAwesome 
              name="star" 
              size={20} 
              color='#BFBFC0'
            />
          </View>
        </View>
        
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbTranslateX }],
            },
          ]}
        >
          {isLeftActive ? (
            <SvgXml xml={FireIcon} width={16} height={16} />
          ) : (
            <FontAwesome name="star" size={20} color="#FFD700" />
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  track: {
    width: 105,
    height: 40,
    backgroundColor: '#E3E3E4',
    borderRadius: 25,
    position: 'relative',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  icon: {
    fontSize: 18,
    color: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: {
    color: '#FFFFFF',
  },
  thumb: {
    width: 46,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    position: 'absolute',
    top: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbIcon: {
    fontSize: 16,
  },
});
