import '../styles/main.css'
import type { AppProps } from 'next/app'
import { AlertsContextProvider } from '../contexts/AlertsContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AlertsContextProvider>
      <Component {...pageProps} />
    </AlertsContextProvider>
  )
}
