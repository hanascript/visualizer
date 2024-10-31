'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALGORITHMS } from '../lib/constants';
import { useSortingAlgorithm } from '../hooks/use-sorting-algorithm';

export const SortingSelect = () => {
  const { algorithm, setAlgorithm, isRunning } = useSortingAlgorithm();

  return (
    <Select
      defaultValue={algorithm}
      onValueChange={setAlgorithm}
      disabled={isRunning}
    >
      <SelectTrigger className='w-48'>
        <SelectValue
          defaultValue={algorithm}
          placeholder='Algorithm Select'
        />
      </SelectTrigger>
      <SelectContent>
        {ALGORITHMS.map(option => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
