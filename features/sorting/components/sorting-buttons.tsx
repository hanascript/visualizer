'use client';

import { Button } from '@/components/ui/button';
import { SelectOptionsType, SortingAlgorithmType } from '@/features/sorting/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSortingAlgorithm } from '@/features/sorting/hooks/use-sorting-algorithm';
import { generateAnimationArray } from '../lib/utils';
import { PlayIcon, RefreshCcw, Square } from 'lucide-react';

export const SortingButtons = () => {
  const { algorithm, isRunning, isSorted, arrayToSort, runAnimation, resetArrayAnimation } = useSortingAlgorithm();

  const handlePlay = () => {
    if ((isRunning && !isSorted) || (!isRunning && isSorted)) {
      console.log('Resetting array');
      resetArrayAnimation();
      return;
    }
    generateAnimationArray(algorithm, isRunning, arrayToSort, runAnimation);
  };

  return (
    <div className='flex gap-4 items-center justify-start'>
      <Button
        className='flex items-center gap-2 p-6'
        onClick={handlePlay}
      >
        {!isRunning && !isSorted && (
          <>
            <PlayIcon className='size-4 text-primary-foreground fill-primary-foreground' />
            Play
          </>
        )}
        {isRunning && !isSorted && (
          <>
            <Square className='size-4 text-primary-foreground fill-primary-foreground' />
            Stop
          </>
        )}
        {!isRunning && isSorted && (
          <>
            <RefreshCcw className='size-4' />
            Reset
          </>
        )}
      </Button>
    </div>
  );
};
