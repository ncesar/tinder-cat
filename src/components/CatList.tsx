import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import DeckSwiper from 'react-native-deck-swiper';
import { useInfiniteCatsBreeds } from '../hooks/useCatsBreeds';
import { CatBreed } from '../types/cat';
import { Breed } from '../types/breeds';
import { CatCard } from './CatCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface CatListProps {
  onLike?: (cat: CatBreed, urlImage: string) => void;
  onDislike?: (cat: CatBreed) => void;
  swipeDirection?: 'left' | 'right' | null;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export const CatList: React.FC<CatListProps> = ({ 
  onLike, 
  onDislike, 
  swipeDirection, 
  currentIndex: propCurrentIndex = 0,
  onIndexChange 
}) => {
  const { 
    data, 
    isLoading: loading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteCatsBreeds();
  
  const [isSwipingLeft, setIsSwipingLeft] = React.useState(false);
  const [isSwipingRight, setIsSwipingRight] = React.useState(false);
  const [isManualSwipe, setIsManualSwipe] = React.useState(false);
  const deckSwiperRef = React.useRef<any>(null);


  const cats = data?.pages.flat() as Breed[] || [];

  React.useEffect(() => {
    if (swipeDirection && deckSwiperRef.current) {
      setTimeout(() => {
        if (deckSwiperRef.current) {
          if (swipeDirection === 'left') {
            setIsSwipingLeft(true);
            deckSwiperRef.current.swipeLeft();
          } else if (swipeDirection === 'right') {
            setIsSwipingRight(true);
            deckSwiperRef.current.swipeRight();
          }
        }
      }, 50);
    }
  }, [swipeDirection]);

  React.useEffect(() => {
    if (isSwipingLeft || isSwipingRight) {
      const timer = setTimeout(() => {
        setIsSwipingLeft(false);
        setIsSwipingRight(false);
        setIsManualSwipe(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSwipingLeft, isSwipingRight]);

  React.useEffect(() => {
    const remainingCards = cats.length - propCurrentIndex;
    
    if (remainingCards <= 2 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [propCurrentIndex, cats.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading cats...</Text>
      </View>
    );
  }

  if (cats.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading more cats...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Ops! It was not possible to load the cats.
        </Text>
        <Text style={styles.errorSubtext}>
          Check your connection and try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.swiperContainer}>
      <View style={styles.overlayContainer}>
        {((swipeDirection === 'left' || isSwipingLeft) && !isManualSwipe) && (
          <View style={[styles.customTag, styles.nopeTag]}>
            <Text style={styles.tagText}>NOPE</Text>
          </View>
        )}
        {((swipeDirection === 'right' || isSwipingRight) && !isManualSwipe) && (
          <View style={[styles.customTag, styles.likeTag]}>
            <Text style={styles.tagText}>LIKE</Text>
          </View>
        )}
        {isManualSwipe && isSwipingLeft && (
          <View style={[styles.customTag, styles.nopeTag]}>
            <Text style={styles.tagText}>NOPE</Text>
          </View>
        )}
        {isManualSwipe && isSwipingRight && (
          <View style={[styles.customTag, styles.likeTag]}>
            <Text style={styles.tagText}>LIKE</Text>
          </View>
        )}
      </View>
      
      {(isFetchingNextPage && cats.length === 0) && (
        <View style={styles.loadingMoreContainer}>
          <ActivityIndicator size="small" color="#FF6B6B" />
          <Text style={styles.loadingMoreText}>Loading more cats...</Text>
        </View>
      )}

      <DeckSwiper
        ref={deckSwiperRef}
        cards={cats || []}
        renderCard={(cat: Breed) => (
          <CatCard
            cat={cat.breeds[0]}
            url={cat.url}
          />
        )}
        onSwiping={(x, y) => {
          if (x < -50) {
            setIsManualSwipe(true);
            setIsSwipingLeft(true);
            setIsSwipingRight(false);
          } else if (x > 50) {
            setIsManualSwipe(true);
            setIsSwipingRight(true);
            setIsSwipingLeft(false);
          }
        }}
        onSwipedLeft={(index) => {
          setIsSwipingLeft(false);
          setIsManualSwipe(false);
          const cat = cats?.[index];
          if (cat?.breeds?.[0]) {
            onDislike?.(cat.breeds[0]);
          }
          onIndexChange?.(index + 1);
        }}
        onSwipedRight={(index) => {
          setIsSwipingRight(false);
          setIsManualSwipe(false);
          const cat = cats?.[index];
          if (cat?.breeds?.[0]) {
            onLike?.(cat.breeds[0], cat.url);
          }
          onIndexChange?.(index + 1);
        }}
        cardIndex={propCurrentIndex}
        backgroundColor="transparent"
        stackSize={2}
        stackSeparation={0}
        animateOverlayLabelsOpacity={true}
        animateCardOpacity={false}
        swipeBackCard={false}
        marginTop={0}
        marginBottom={0}
        infinite={false}
        disableBottomSwipe={true}
        disableTopSwipe={true}
        disableLeftSwipe={false}
        disableRightSwipe={false}
        verticalSwipe={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
    pointerEvents: 'box-none',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
    pointerEvents: 'none',
  },
  customTag: {
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 10,
  },
  nopeTag: {
    backgroundColor: '#E16359',
    top: 50,
    left: 20,
    transform: [{ rotate: '-15deg' }],
  },
  likeTag: {
    backgroundColor: '#6BD88E',
    top: 50,
    left: 20,
    transform: [{ rotate: '-15deg' }],
  },
  tagText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
  loadingMoreContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    elevation: 1000,
  },
  loadingMoreText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
