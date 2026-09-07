import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import App from './App'
import './styles/index.css'

// Simulated requests are one-shot mutations; nothing here is worth retrying.
const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: false } },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          classNames: {
            toast: 'bg-surface! border-0! border-l-[3px]! text-fg! rounded-xl! font-sans!',
            error: 'border-l-danger!',
            success: 'border-l-accent!',
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
)
