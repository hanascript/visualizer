'use client';

import { Button } from '@/components/ui/button';
import { useMount } from 'react-use';
import { useSortingAlgorithm } from '@/features/sorting/hooks/use-sorting-algorithm';
import { generateRandomNumberFromInterval } from '@/lib/utils';

export const SortingVisualizer = () => {
  const { arrayToSort, setArrayToSort } = useSortingAlgorithm();

  // Function to generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: 35 }, () => generateRandomNumberFromInterval(5, 80));
    setArrayToSort(newArray);
  };

  useMount(() => {
    generateArray();
  });

  return (
    <div className='flex flex-col md:flex-row p-4'>
      {/* Info Section */}
      <div className='md:w-1/2'>
        <h2 className='text-xl font-bold mb-2'>Sorting Algorithm</h2>
        <p className='text-sm'>
          This is where you can put information about the sorting algorithm. Explain how it works, its time complexity,
          and other relevant details.
        </p>
      </div>

      {/* Visualization Section */}
      <div className='md:w-1/2'>
        <h2 className='text-xl font-bold mb-2'>Visualizer</h2>
        <div className='h-64  flex items-end justify-center border'>
          {arrayToSort.map((value, index) => (
            <div
              key={index}
              className='w-2 bg-black mx-0.5'
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
        <Button onClick={generateArray}>Generate New Array</Button>
      </div>
    </div>
  );
};
