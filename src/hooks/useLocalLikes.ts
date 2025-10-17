import { useState } from 'react';
import { CatBreed, LikedCatBreed } from '../types/cat';

export function useLocalLikes() {
  const [likedCats, setLikedCats] = useState<LikedCatBreed[]>([]);

  const addLike = (cat: CatBreed, urlImage: string) => {
    if (!likedCats.some(likedCat => likedCat.id === cat.id)) {
      const newLikedCats = [...likedCats, { ...cat, urlImage }];
      setLikedCats(newLikedCats);
    }
  };

  const removeLike = (catId: string) => {
    const filteredCats = likedCats.filter(cat => cat.id !== catId);
    setLikedCats(filteredCats);
  };

  const clearAllLikes = () => {
    setLikedCats([]);
  };

  const isLiked = (catId: string) => {
    return likedCats.some(cat => cat.id === catId);
  };

  return {
    likedCats,
    addLike,
    removeLike,
    clearAllLikes,
    isLiked,
    likeCount: likedCats.length,
  };
}
