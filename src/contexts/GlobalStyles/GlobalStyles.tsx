import { createGlobalStyle } from 'styled-components';

// prettier-ignore
const GlobalStyles = createGlobalStyle`
${({theme}: any) => `
  :root {
    ${Object.entries({
      gray: theme.colors.gray,
      green: theme.colors.green,
    })
      .map(([colorName, colors]) =>
        colors.map((color: string, index: number) => `
          --${colorName}-${index}: ${color};
        `).join('')
      )
      .join('')
    }

    --radius-sm: ${theme.radius.sm}px;
  }

  body {
    color: var(--gray-0);
    cursor: default;
  }

  .mantine-Tooltip-body {
    background-color: var(--gray-3);
    color: var(--gray-7);
  }

  ${theme.colorScheme === 'light' ? `
    .mantine-Notification-root {
      background: var(--gray-2);
    }
  ` : `
    .mantine-Notification-root {
      background: var(--gray-8);
    }
  `}
`}
`;

export default GlobalStyles;
