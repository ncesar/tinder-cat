import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CatList } from '../components/CatList';
import { ChatList } from '../components/ChatList';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { BottomNavigation } from '../components/BottomNavigation';
import { ActionButtons } from '../components/ActionButtons';
import { CatBreed } from '../types/cat';
import { useVoteMutation } from '../hooks/useVotes';
import { useLocalLikes } from '../hooks/useLocalLikes';

export default function HomeScreen(): React.JSX.Element {
  const [isCatsMode, setIsCatsMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'profile'>('home');
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const voteMutation = useVoteMutation();
  const { likedCats, addLike } = useLocalLikes();

  React.useEffect(() => {
    if (swipeDirection) {
      setTimeout(() => {
        setSwipeDirection(null);
      }, 100);
    }
  }, [swipeDirection]);

  const handleLikeCat = React.useCallback((cat: CatBreed, urlImage: string) => {
    addLike(cat, urlImage);
    
    voteMutation.mutate({
      image_id: cat.id,
      value: 1,
    }, {
      onSuccess: (data) => {
        console.log('Like sent to API:', data);
      },
      onError: (error) => {
        console.error('Error like:', error);
      }
    });
  }, [voteMutation, addLike]);

  const handleDislikeCat = React.useCallback((cat: CatBreed) => {
    voteMutation.mutate({
      image_id: cat.id,
      value: 0,
    }, {
      onSuccess: (data) => {
        console.log('Nope:', data);
      },
      onError: (error) => {
        console.error('Error nope:', error);
      }
    });
  }, [voteMutation]);

  const handleToggle = React.useCallback((isLeft: boolean) => {
    setIsCatsMode(isLeft);
  }, []);

  const handleTabPress = React.useCallback((tab: 'home' | 'chat' | 'profile') => {
    setActiveTab(tab);
  }, []);


  const handleDislike = React.useCallback(() => {
    setSwipeDirection('left');
  }, []);

  const handleLike = React.useCallback(() => {
    setSwipeDirection('right');
  }, []);

  const renderContent = () => {
    if (activeTab === 'home') {
      return (
        <CatList 
          onLike={handleLikeCat} 
          onDislike={handleDislikeCat}
          swipeDirection={swipeDirection}
          currentIndex={currentIndex}
          onIndexChange={(newIndex) => {
            setCurrentIndex(newIndex);
          }}
        />
      );
    }
    
    if (activeTab === 'chat') {
      return (
        <ChatList 
          likedCats={likedCats}
        />
      );
    }
 
    return (
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Profile Screen</Text>
        <Text style={styles.profileSubtext}>Coming soon...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ToggleSwitch 
          isLeftActive={isCatsMode} 
          onToggle={handleToggle} 
        />
      </View>
      
      <View style={styles.content}>
        {renderContent()}
      </View>

      <View style={styles.bottomSection}>
        {activeTab === 'home' && (
          <ActionButtons 
            onDislike={handleDislike}
            onLike={handleLike}
          />
        )}

        <BottomNavigation 
          activeTab={activeTab} 
          onTabPress={handleTabPress}
          likeCount={likedCats.length}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-between',
  },
  bottomSection: {
    backgroundColor: '#F5F5F5',
    zIndex: 10,
    elevation: 10,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#434141',
    marginBottom: 10,
    textAlign: 'center',
  },
  profileSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
