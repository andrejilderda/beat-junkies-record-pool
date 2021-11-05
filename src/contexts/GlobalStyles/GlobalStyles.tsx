import React from 'react';
import { createGlobalStyle } from 'styled-components';

// prettier-ignore
const GlobalStyles = createGlobalStyle`
${({ theme: { colors } }: any) => `
  :root {
    ${Object.entries({
      gray: colors.gray,
      green: colors.green,
    })
      .map(([colorName, colors]) =>
        colors.map((color: string, index: number) => `
          --${colorName}-${index}: ${color};
        `).join('')
      )
      .join('')
    }
  }

  .mantine-Tooltip-body {
    background-color: var(--gray-3);
    color: var(--gray-7);
  }
`}
`;

export default GlobalStyles;
