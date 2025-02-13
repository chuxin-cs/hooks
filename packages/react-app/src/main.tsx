import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

app = createRoot(document.getElementById('root')!);
app.render(
  <App />
)