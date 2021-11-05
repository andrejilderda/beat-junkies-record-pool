import { useState, ChangeEvent } from 'react';

const useSearchField = () => {
  const [value, setValue] = useState('');

  return {
    value,
    setValue,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  }
}

export default useSearchField;