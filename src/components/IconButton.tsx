import { ReactNode } from 'react'

interface IconButtonProps {
  icon: ReactNode
  title: string
  alert?: boolean
}

export function IconButton({ icon, title, alert = false }: IconButtonProps) {
  return (
    <div className="flex items-center relative">
      {alert && (
        <span className="bg-teal-500 absolute rounded-full w-2 h-2 top-0 right-0" />
      )}
      <button title={title}>{icon}</button>
    </div>
  )
}
