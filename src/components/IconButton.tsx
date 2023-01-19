import { ReactNode } from 'react'

interface IconButtonProps {
  icon: ReactNode
  title: string
}

export function IconButton({ icon, title }: IconButtonProps) {
  return (
    <>
      <button title={title}>{icon}</button>
    </>
  )
}
