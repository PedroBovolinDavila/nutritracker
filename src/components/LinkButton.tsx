import { ReactNode } from 'react'

interface LinkButtonProps {
  onClick?: () => void
  children: ReactNode
}

export function LinkButton({ children, onClick }: LinkButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-slate-700 p-2 text-slate-200 font-semibold text-sm rounded-md hover:bg-slate-600 transition-all"
    >
      {children}
    </button>
  )
}
