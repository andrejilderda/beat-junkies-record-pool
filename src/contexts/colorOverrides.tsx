const palette = {
  gray: [
    '#FAFAFA',
    '#F4F4F5',
    '#E4E4E7',
    '#D4D4D8',
    '#A1A1AA',
    '#71717A',
    '#52525B',
    '#3F3F46',
    '#27272A',
    '#18181B',
  ],
};

const getColorOverrides = (colorScheme: 'dark' | 'light'): any => {
  return {
    gray: colorScheme === 'dark' ? palette.gray : [...palette.gray].reverse(),
    dark: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      '#18181B',
      undefined,
      undefined,
    ],
  };
};

export default getColorOverrides;
