// src/hooks/useCatBreeds.ts
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { Breed } from '../types/breeds';

const API_BASE = 'https://api.thecatapi.com/v1';
const API_KEY = 'DEMO-API-KEY';

async function fetchBreeds(): Promise<Breed[]> {
  const res = await fetch(`${API_BASE}/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  });
  if (!res.ok) {
    throw new Error('Error searching for cat breeds');
  }
  const data = await res.json();
  return data as Breed[];
}

/**
 * Function that fetches a specific page of cats from the API
 * 
 * @param pageParam - Page number (0, 1, 2, 3...)
 * @returns Array with 10 cats from the requested page
 */
async function fetchBreedsPage({ pageParam }: { pageParam: unknown }): Promise<Breed[]> {
  const page = pageParam as number;
  const res = await fetch(`${API_BASE}/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=10`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  });
  if (!res.ok) {
    throw new Error('Error searching for cat breeds');
  }
  const data = await res.json();
  return data as Breed[];
}

export function useCatsBreeds() {
  return useQuery<Breed[], Error>({
    queryKey: ['catsBreeds'],
    queryFn: fetchBreeds,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook for infinite pagination of cats
 * 
 * How it works:
 * 1. Loads the first page (10 cats) automatically
 * 2. When user swipes and only 2 cards remain, automatically loads the next page
 * 3. Concatenates all pages into a single list (data.pages.flat())
 * 4. Never stops loading - there are always more cats available
 * 
 * Benefits:
 * - Performance: only loads when needed
 * - UX: user never runs out of cards to swipe
 * - Memory: keeps only the loaded pages
 */
export function useInfiniteCatsBreeds() {
  return useInfiniteQuery<Breed[], Error>({
    queryKey: ['catsBreedsInfinite'],
    queryFn: fetchBreedsPage,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has less than 10 items, there are no more pages
      if (lastPage.length < 10) {
        return undefined;
      }
      // Returns the next page number (0, 1, 2, 3...)
      return allPages.length;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
