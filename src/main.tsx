import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { MantineProvider, createEmotionCache } from '@mantine/core';

import './globals.css';

const cache = createEmotionCache({ key: 'mantine' });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider emotionCache={cache} withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
