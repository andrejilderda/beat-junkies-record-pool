import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider, QueryClient } from 'react-query';
import MantineThemeContext from './contexts/MantineThemeContext';
import ThemeContext from './contexts/ThemeContext';
import { NotificationsProvider } from '@mantine/notifications';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MantineThemeContext>
      <ThemeContext>
        <NotificationsProvider position="top-right">
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </NotificationsProvider>
      </ThemeContext>
    </MantineThemeContext>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
