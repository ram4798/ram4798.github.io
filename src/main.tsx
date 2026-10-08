import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import './styles.css';
import App from './App';

const root = document.getElementById('root')!;
const app = <StrictMode><App /></StrictMode>;
if (root.childElementCount) hydrateRoot(root, app);
else createRoot(root).render(app);
