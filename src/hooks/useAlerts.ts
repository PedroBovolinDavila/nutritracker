import { useContext } from 'react'
import { AlertsContext } from '../contexts/AlertsContext'

export function useAlerts() {
  const { alerts } = useContext(AlertsContext)
  return {
    alerts,
  }
}
