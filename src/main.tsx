import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { MantineProvider, createEmotionCache } from '@mantine/core';

import './globals.css';

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
            '#f0e5ff',
            '#ccb7fe',
            '#ab87f8',
            '#8959f4',
            '#6729ef',
            '#4d10d6',
            '#3c0ba7',
            '#2a0879',
            '#19044a',
            '#0a001e',
          ],
          secondary: [
            '#e9f1fe',
            '#ccd5e7',
            '#acbad2',
            '#8c9ebf',
            '#6c82ac',
            '#536993',
            '#405173',
            '#2d3a53',
            '#192334',
            '#040c17',
          ],
        },
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
