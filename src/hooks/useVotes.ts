// src/hooks/useVotes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { VotePayload, VoteResponse } from '../types/vote';

const API_BASE = 'https://api.thecatapi.com/v1';
const API_KEY = 'DEMO-API-KEY';

async function fetchVotes() {
  const res = await fetch(`${API_BASE}/votes`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  });
  if (!res.ok) {
    throw new Error('Error fetching votes');
  }
  const data = await res.json();
  return data as VoteResponse[];
}

async function postVote(votePayload: VotePayload): Promise<VoteResponse> {
  const res = await fetch(`${API_BASE}/votes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify(votePayload),
  });
  
  if (!res.ok) {
    throw new Error('Error posting vote');
  }
  
  const data = await res.json();
  return data as VoteResponse;
}

export function useVotes() {
  return useQuery<VoteResponse[], Error>({
    queryKey: ['votes'],
    queryFn: fetchVotes,
    staleTime: 1000 * 60 * 5,
  });
}

export function useVoteMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: postVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['votes'] });
    },
    onError: (error) => {
      console.error('Error voting:', error);
    },
  });
}
