import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { Patient } from '../pages/doctor'

export interface Alert {
  id: string
  title: string
  description: string
  patient: Patient
  viewed: boolean
  doctor: {
    id: string
    avatar_url: string
    name: string
    lastName: string
    description: string
  }
}

interface AlertContextParams {
  alerts: Alert[]
}

export const AlertsContext = createContext<AlertContextParams>(
  {} as AlertContextParams,
)

interface AlertsContextProviderProps {
  children: ReactNode
}

export function AlertsContextProvider({
  children,
}: AlertsContextProviderProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    async function getAlerts() {
      const { data } = await api.get('/get-alerts')

      setAlerts(data.alerts)
    }

    getAlerts()
  }, [])

  return (
    <AlertsContext.Provider
      value={{
        alerts,
      }}
    >
      {children}
    </AlertsContext.Provider>
  )
}
