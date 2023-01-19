import Link from 'next/link'
import { ReactNode } from 'react'

interface LinkButtonProps {
  to: string
  children: ReactNode
}

export function LinkButton({ children, to }: LinkButtonProps) {
  return (
    <Link
      href={to}
      className="bg-slate-700 p-2 text-slate-200 font-semibold text-sm rounded-md hover:bg-slate-600 transition-all"
    >
      {children}
    </Link>
  )
}
