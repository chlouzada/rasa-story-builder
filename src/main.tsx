import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { MantineProvider, createEmotionCache } from '@mantine/core';

import './globals.css';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';

const cache = createEmotionCache({ key: 'mantine' });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      emotionCache={cache}
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          primary: [
            '#EEE7FD',
            '#EEE7FD',
            '#D0BCFA',
            '#B192F7',
            '#9367F4',
            '#743CF1',
            '#5611EE',
            '#450EBE',
            '#340A8F',
            '#22075F',
          ],
          secondary: [
            '#EEF1F6',
            '#EEF1F6',
            '#D1D8E6',
            '#B3BFD6',
            '#95A6C6',
            '#788DB5',
            '#5A74A5',
            '#485D84',
            '#364663',
            '#242F42',
          ],
        },
      }}
    >
      <NotificationsProvider position='bottom-center'>
      <ModalsProvider>
        <App />
      </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
