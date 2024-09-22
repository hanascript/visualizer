'use client';

import { useSortingAlgorithm } from '@/features/sorting/hooks/use-sorting-algorithm';
import { useLifecycles } from 'react-use';
import { SortingButtons } from './sorting-buttons';
import { SortingSlider } from './sorting-slider';

export const SortingVisualizer = () => {
  const { arrayToSort, resetArrayAnimation, speed } = useSortingAlgorithm();

  useLifecycles(
    () => {
      resetArrayAnimation();
      window.addEventListener('resize', resetArrayAnimation);
    },
    () => {
      window.removeEventListener('resize', resetArrayAnimation);
    }
  );

  return (
    <div className='p-4'>
      {/* Info Section */}
      <div className='space-y-4'>
        <h2 className='text-xl font-bold mb-2'>Sorting Algorithm</h2>
        <p className='text-sm'>
          This is where you can put information about the sorting algorithm. Explain how it works, its time complexity,
          and other relevant details.
        </p>
        {speed}
        <SortingButtons />
        <SortingSlider />
      </div>

      {/* Visualization Section */}

      <div className='h-64 flex items-center justify-center bg-muted rounded'>
        <div
          id='content-container'
          className='flex items-end justify-center h-2/3 pb-4  w-full px-4'
        >
          {arrayToSort.map((value, index) => (
            <div
              key={index}
              className='array-line default-line-color rounded mx-0.5 w-5 relative shadow-xl border-2'
              style={{ height: `${value}px` }}
            >
              <span className='absolute -bottom-5 left-0 text-center text-xs'>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
