import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'IdeaVault — Share & Validate Startup Ideas',
  description:
    'IdeaVault is a community platform to share innovative startup ideas, get feedback, and refine concepts together.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--card)',
                color: 'var(--ink)',
                border: '1px solid var(--outline)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
