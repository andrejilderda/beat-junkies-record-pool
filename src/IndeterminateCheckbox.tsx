import React, { useEffect, useRef } from 'react';

interface IndeterminateCheckboxProps {
  value: 'CHECKED' | 'INDETERMINATE';
}

const IndeterminateCheckbox = (props: IndeterminateCheckboxProps) => {
  const { value, ...otherProps } = props;
  const checkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!checkRef?.current) return;
    checkRef.current.checked = value === 'CHECKED';
    checkRef.current.indeterminate = value === 'INDETERMINATE';
  }, [value])

  return (
    <input
      type="checkbox"
      ref={checkRef}
      {...otherProps}
    />
  )
}

export default IndeterminateCheckbox;