import React from 'react';
import { createGlobalStyle } from 'styled-components';

// prettier-ignore
const CustomProperties = createGlobalStyle`
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
`}
`;

export default CustomProperties;
